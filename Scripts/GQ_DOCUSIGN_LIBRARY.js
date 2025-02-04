/*******************************************************
| Script/Function: GQ_DOCUSIGN_LIBRARY
| Created by: Dane Quatacker
| Created on: 2024-03-13
| Usage: Shared functions used by Gray Quarter Docusign.
         Requires GQ_DOCUSIGN_GEN_REPORT.js & GQ_DOCUSIGN_SEND_REPORT.js
         This Script should not be modified except by Gray Quarter.

| V1.1 - 2024-03-13 - Initial
 ********************************************************/

//LOAD DEPENDENCIES
include("GQ_UTILITY_LIBRARY"); //dependency

//LOAD LIBRARY
if (typeof (gq) == 'undefined') {
    gq = {};
}
if (typeof (gq.docusign) == 'undefined') {
    //load if not already loaded
    gq.docusign = new gqDocusignLibrary();
    if (typeof (logDebug) == "function") {
        logDebug("loaded via include GQ_DOCUSIGN_LIBRARY " + gq.docusign.version);
    }
}

//LIBRARY OBJECT
function gqDocusignLibrary() {
    this.version = "1.1";

    this.doDocusign = function(Organization, pCapId, ReturnDocType, EmailSubject, Signers, Documents, message){
        return new doDocusignObj(Organization, pCapId, ReturnDocType, EmailSubject, Signers, Documents, message);
    }
    
    function doDocusignObj(Organization, pCapId, ReturnDocType, EmailSubject, Signers, Documents, message) {
        this.URL = String(lookup("INTERFACE_DOCUSIGN", "REST_URL"));
        this.APIKEY = String(lookup("INTERFACE_DOCUSIGN", "API_KEY"));
        this.Organization = Organization;
        this.pCapId = pCapId;
        this.RecordId = String(pCapId.getCustomID());
        this.RecordKey = aa.getServiceProviderCode() + "-" + pCapId.getID1() + "-" + pCapId.getID2() + "-" + pCapId.getID3();
        this.ReturnDocType = ReturnDocType || "";
        this.EmailSubject = EmailSubject || (Organization + " eSignature for " + this.RecordId);
        this.Signers = Signers || [];
        this.EmailBlurb = message || "";
        this.CCs = [];
        if (this.Signers.length == null) {
            this.Signers = [this.Signers]; //cast it to an array if not an array already.
        }
        this.Documents = Documents || [];
        if (this.Documents.length == null) {
            this.Documents = [this.Documents]; //cast it to an array if not an array already.
        }

        /**
         * Adds a new Signer
         * @param {dsSignerObj} dsObj 
         */
        this.AddSigner = function (dsObj) {
            this.Signers.push(dsObj);
        }

        this.AddCC = function (FullName, Email) {
            var o = {};
            o.FullName = FullName;
            o.Email = Email;
            this.CCs.push(o);
        }

        /**
         * Adds a new doc to the signing array
         * @param {int} docId 
         */
        this.AddDocument = function (docId) {
            var dsDocObj = {};
            dsDocObj.DocumentType = 1;
            dsDocObj.docLong = String(docId);
            dsDocObj.docurl = "";
            dsDocObj.order = String(this.Documents.length + 1);
            this.Documents.push(dsDocObj);
        }

        /**
         * Adds document from envelop record by type, if multiple grabs first occurance
         * @param {string} docType 
         */
        this.AddDocumentType = function (docType) {
            //TODO: LOOKUP DOCUMENT ID AND TO ARRAY
            var docList = aa.document.getDocumentListByEntity(this.pCapId, "CAP").getOutput().toArray();
            if (docList.length > 0) {
                //Convert list to upper case  
                for (docItem in docList) {
                    if (String(docList[docItem].getDocCategory()).toLowerCase() == String(docType).toLowerCase()) {
                        var dsDocObj = {};
                        dsDocObj.DocumentType = 1;
                        dsDocObj.docLong = String(docList[docItem].getDocumentNo(), 10);
                        dsDocObj.docurl = "";
                        dsDocObj.order = String(this.Documents.length + 1);
                        this.Documents.push(dsDocObj);
                        logDebug("Added Doc #" + docList[docItem].getDocumentNo());
                        return;
                    }
                }
            }
        }

        /**
         * Posts the object to the REST endpoint for signing should only be invoked once after everything loaded
         */
        this.Send = function () {
            var tmpSigners = [];
            if (this.Documents) {
                if (this.Documents.length) {
                    if (this.Documents.length == 0) {
                        return { success: false, message: "One or more documents required for signing" };
                    }
                }
                else {
                    return { success: false, message: "One or more documents required for signing" };
                }
            }
            else {
                return { success: false, message: "Documents must be a numeric array of document ids to be signed" };
            }
            if (this.Signers.length) {
                if (this.Signers.length > 0) {
                    for (var i = 0; i < this.Signers.length; i++) {
                        if (this.Signers[i]) {
                            if (this.Signers[i].Email == "" || this.Signers[i].Email == null) {
                                return { success: false, message: "Email address is required for all signers" };
                            }
                            if (this.Signers[i].SignHere.length == 0) {
                                this.Signers[i].AddSignHere("/sn" + (i + 1) + "/");
                            }
                            if (this.Signers[i].DateHere.length == 0) {
                                this.Signers[i].AddDateHere("/dt" + (i + 1) + "/");
                            }
                            if (this.Signers[i].FullNameHere.length == 0) {
                                this.Signers[i].AddFullNameHere("/fn" + (i + 1) + "/");
                            }
                        }
                        tmpSigners.push(this.Signers[i].BuildSignerObj());
                    }
                }
                else {
                    return { success: false, message: "1 or more signers required" };
                }
            }
            else {
                return { success: false, message: "Signers must be an Array" };
            }
            var Envelope = {
                Organization: this.Organization,
                RecordId: this.RecordId,
                RecordKey: this.RecordKey,
                ReturnDocType: this.ReturnDocType,
                EmailSubject: this.EmailSubject,
                EmailBlurb: this.EmailBlurb,
                Signers: tmpSigners,
                Documents: this.Documents,
                CCs: this.CCs
            };

            return gq.util.httpPostJsonToService(this.URL, Envelope, this.APIKEY);
        }

    }

    /**
     * Docusign Signer Object
     * @param {string} FullName
     * @param {string} Email
     */
    this.dsSignerObj = function(FullName, Email){
        return new dsSignerObject(FullName, Email);
    }
    
    function dsSignerObject(FullName, Email) {
        this.FullName = FullName || "";
        this.Email = Email || "";

        this.SignHere = [];
        this.DateHere = [];
        this.FullNameHere = [];

        /**
         * Load from Primary Contact Type
         * @param {capIdModel} pCapId 
         */
        this.SignerFromPrimary = function (pCapId) {
            this.FullName = "";
            this.Email = "";
            //Get primary contact and fill full name and email
            var conArr = new Array();
            var capContResult = aa.people.getCapContactByCapID(pCapId);
            if (capContResult.getSuccess()) {
                conArr = capContResult.getOutput();
                for (contact in conArr) {
                    if (conArr[contact].getPeople().getFlag() == "Y") {
                        var fullName = conArr[contact].getPeople().getFullName() || "";
                        var fName = conArr[contact].getPeople().getFirstName() || "";
                        var lName = conArr[contact].getPeople().getLastName() || "";
                        var busName = String(conArr[contact].getPeople().getBusinessName())
                        var email = String(conArr[contact].getPeople().getEmail());
                        if (fName != "" || lName != "") {
                            this.FullName = String(fName + " " + lName).trim();
                        }
                        else if (fullName != "") {
                            this.FullName = String(fullName);
                        }
                        else {
                            this.FullName = String(busName);
                        }
                        if (email.indexOf("@") > 0) {
                            this.Email = String(email);
                        }
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Load a signer from contact type, if multiple of same type grabs first one
         * @param {capIdModel} pCapId 
         * @param {string} contactType
         */
        this.SignerFromContactType = function (pCapId, contacType) {
            //TODO: lookup primary contact and them
            this.FullName = "";
            this.Email = "";
            //Get primary contact and fill full name and email
            var conArr = new Array();
            var capContResult = aa.people.getCapContactByCapID(pCapId);
            if (capContResult.getSuccess()) {
                conArr = capContResult.getOutput();
                for (contact in conArr) {
                    if (String(conArr[contact].getPeople().getContactType()).toLowerCase() == String(contacType).toLowerCase()) {
                        var fullName = conArr[contact].getPeople().getFullName() || "";
                        var fName = conArr[contact].getPeople().getFirstName() || "";
                        var lName = conArr[contact].getPeople().getLastName() || "";
                        var busName = String(conArr[contact].getPeople().getBusinessName())
                        var email = String(conArr[contact].getPeople().getEmail());
                        if (fName != "" || lName != "") {
                            this.FullName = String(fName + " " + lName).trim();
                        }
                        else if (fullName != "") {
                            this.FullName = String(fullName);
                        }
                        else {
                            this.FullName = busName;
                        }
                        if (email.indexOf("@") > 0) {
                            this.Email = email;
                        }
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Pulls just object members out for sending envelope
         */
        this.BuildSignerObj = function () {

            var obj = {
                FullName: this.FullName,
                Email: this.Email,
                SignHere: this.SignHere,
                DateHere: this.DateHere,
                FullNameHere: this.FullNameHere
            }
            return obj;
        }

        /**
         * Adds a new token for signing
         * @param {string} token 
         * @param {int} offx defaults 20 if null
         * @param {int} offy defualts 5 if null
         */
        this.AddSignHere = function (token, offx, offy) {
            var tmp = {
                token: token,
                offX: (offx == null ? "20" : offx),
                offY: (offy == null ? "5" : offy),
                XPosition: ""
            }
            this.SignHere.push(tmp);
        }
        /**
         * Adds new token replacement for where date should go
         * @param {string} token 
         * @param {int} offx defaults to 0
         * @param {int} offy defaults to 0
         */
        this.AddDateHere = function (token, offx, offy) {
            var tmp = {
                token: token,
                offX: (offx == null ? "0" : offx),
                offY: (offy == null ? "0" : offy),
                XPosition: ""
            }
            this.DateHere.push(tmp);
        }
        /**
         * Adds a new token where full name of signer should be pushed to
         * @param {string} token 
         * @param {int} offx defaults to 0
         * @param {int} offy defaults to 0
         */
        this.AddFullNameHere = function (token, offx, offy) {
            var tmp = {
                token: token,
                offX: (offx == null ? "0" : offx),
                offY: (offy == null ? "0" : offy),
                XPosition: ""
            }
            this.FullNameHere.push(tmp);
        }
    }


    this.GqRunReportAndSign = function (gqOptions) {
        //1. Invoke the Async Script to generate the report
        for(var scriptName in gqOptions){
            if (gqOptions[scriptName]) {
                var genParameters = aa.util.newHashMap();
                genParameters.put("AsyncScriptName", scriptName);
                genParameters.put("recordId", String(capIDString));
                genParameters.put("currentUserID", currentUserID);
                genParameters.put("gqOptions", JSON.stringify(gqOptions));
                logDebug("Invoke EVENT_FOR_ASYNC " + scriptName);
                aa.runAsyncScript("EVENT_FOR_ASYNC", genParameters);
            }
        }        
    }
}













