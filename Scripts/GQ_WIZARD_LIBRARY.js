/*******************************************************
| Script/Function: GQ_WIZARD_LIBRARY
| Created by: John Schomp
| Created on: 6/2/2021
| Usage: Shared functions used by G-Wiz, deploy to Accela invoke include("GQ_WIZARD_LIBRARY");
| V1.1 - 2024-02-20 - Removed Java.io
- Added loadGwizToEdms - Requires URL Report setup, see help.grayquarter.com
- Added Clean ability to load via includes as well as in batch
 ********************************************************/
if (typeof (gqGwiz) == 'undefined') {
    //load if not already loaded
    gqGwiz = new gqGwizLibrary();
    if (typeof (logDebug) == "function") {
        logDebug("loaded via include GQ_WIZARD_LIBRARY " + gqGwiz.version);
    }
}
function gqGwizLibrary() {
    this.version = "1.1";
    /**
     * gqWizardLoadSession - Loads Gray Quarter Session Information
     * @returns Session Object or False
     */
    gqWizardLoadSession = function () {
        var urlVar = "";
        if (arguments.length == 2) {
            urlVar = "?" + arguments[1];  // used for session refresh and maybe more
        }
        var GQ_SESSION_ASI = lookup("GRAYQUARTER", "WIZARD_SESSION_ASI");
        if (arguments.length >= 1) {
            gqsession = arguments[0]; // use session id
            logDebug("GRAYQUARTER USING SESSION ID : " + gqsession);
        } else {

            if (!GQ_SESSION_ASI || GQ_SESSION_ASI == "") {
                logDebug("GRAYQUARTER WIZARD_SESSION_ASI field not configured in bizdomain");
                return false;
            }

            var gqsession = AInfo[GQ_SESSION_ASI];
            if (!gqsession || gqsession == "") {
                logDebug("GRAYQUARTER WIZARD_SESSION_ASI field (" + GQ_SESSION_ASI + ") has no value, exiting");
                return false;
            }
        }

        var GQ_API_KEY = lookup("GRAYQUARTER", "WIZARD_API_KEY");

        if (!GQ_API_KEY || GQ_API_KEY == "") {
            logDebug("GRAYQUARTER Wizard API key not configured");
            return false;
        }

        var GQ_API_URL = lookup("GRAYQUARTER", "WIZARD_API_URL");
        if (!GQ_API_URL || GQ_API_URL == "") {
            logDebug("GRAYQUARTER Wizard URL key not configured");
            return false;
        }

        var resp = gqHttpClient((GQ_API_URL.replace("{0}", gqsession)) + urlVar, "GET", GQ_API_KEY);
        if (resp.code != 200) {
            logDebug("GRAYQUARTER Wizard API call failure.  Bad/mismatch API key?  Wizard session not started via GQ IPAAS? HTTPCode=" + resp.code);
        }

        var jobj = resp.body;

        return jobj;
    }

    gqHttpClientGetBytes = function (url, apiKey, obj) {
        logDebug("gqHttpClientGetBytes has been Removed, use gqRunUrlGetFile2Disk to get Files from GWIZ");
        return false;
    }

    /**
     * gqHttpClient Http Client to get Data.
     * @param {string} url Url to call
     * @param {string} method GET or POST
     * @param {string} apiKey API Key from Gray Quarter
     * @param {object} obj Object for post, must be JSON serializable
     * @returns 
     */
    gqHttpClient = function (url, method, apiKey, obj) {
        var responseObj = {};
        responseObj.body = "";
        responseObj.code = 404;
        try {
            var httpMethod = method ? method : "GET";
            logDebug("Url: " + url);
            if (httpMethod != "GET" && httpMethod != "POST") {
                throw new Error("Unsupported method so far");
            }
            var headers = aa.httpClient.initPostParameters();
            headers.put("Accept-Charset", "UTF-8");
            headers.put("Content-Type", "application/json");
            headers.put("X-API-Key", String(apiKey));
            logDebug(headers);
            var response = null;
            if (httpMethod == "GET") {
                response = aa.httpClient.get(url, headers);
            }
            else if (httpMethod == "POST") {
                response = aa.httpClient.post(url, headers, JSON.stringify(obj))
            }

            if (response.getSuccess()) {
                var data = response.getOutput();
                data = JSON.parse(data);
                responseObj.body = data;
                responseObj.code = 200;
                return responseObj;
            } else {
                throw new Error("Error with request: " + response.getErrorType() + " " + response.getErrorMessage());
            }
        } catch (err) {
            logDebug("Error with gqHttpClient: " + err + " " + err.lineNumber);
        }
        return responseObj;
    }


    createDocumentFromURL = function (itemCapId, newdocuri, documentObject) {

        documentObject.setDocumentNo(null);
        documentObject.setCapID(itemCapId);
        documentObject.setEntityID(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3());
        documentObject.setServiceProviderCode(aa.getServiceProviderCode());
        documentObject.setModuleName(aa.cap.getCap(itemCapId).getOutput().getCapModel().getModuleName());

        var fileName = gqGetGwizFileNameFromUrl(newdocuri);
        var getResult = gqRunUrlGetFile2Disk(fileName);
        if (getResult) {
            // Open and process file
            try {
                // put together the document content - use aa.io.FileInputStream
                var newContentModel = aa.document.newDocumentContentModel().getOutput();

                var fileStream = aa.io.FileInputStream(getResult);
                newContentModel.setDocInputStream(fileStream);
                documentObject.setDocumentContent(newContentModel);
                var newDocResult = aa.document.createDocument(documentObject);
                if (newDocResult.getSuccess()) {
                    var newDoc = newDocResult.getOutput();
                    logDebug("Successfully copied document: " + newDoc.getFileName());
                    return newDoc;
                } else {
                    logDebug("Failed to copy document: " + documentObject.getFileName());
                    logDebug(newDocResult.getErrorMessage());
                }
            } catch (err) {
                logDebug("Error creating document: " + err.message);
            }
        } else {
            logDebug("get " + newdocuri + " failed " + getResult.getErrorMessage());
        }
    }
    //Proxy function to make naming consistent
    gqCreateDocumentFromURL = createDocumentFromURL;


    /**
     * Runs a report with any specified parameters and attaches it to the record
     *
     * @example
     *		runReportAttach(capId,"ReportName","altid",capId.getCustomID(),"months","12");
     *		runReportAttach(capId,"ReportName",paramHashtable);
     * @param capId
     *			itemCapId - capId object
     * @param {report parameter pairs} or {hashtable}
     *			optional parameters are report parameter pairs or a parameters hashtable
     * @returns {filename}
     *			if the report was generated and attached return filename
     *
     */
    runReportAttachGQ = function (itemCapId, aaReportName, parameters) {
        var reportName = aaReportName;
        reportResult = aa.reportManager.getReportInfoModelByName(reportName);

        if (!reportResult.getSuccess()) {
            logDebug("**WARNING** couldn't load report " + reportName + " " + reportResult.getErrorMessage());
            return false;
        }

        var report = reportResult.getOutput();
        var itemCap = aa.cap.getCap(itemCapId).getOutput();
        itemAppTypeResult = itemCap.getCapType();
        itemAppTypeString = itemAppTypeResult.toString();
        itemAppTypeArray = itemAppTypeString.split("/");

        report.setModule(itemAppTypeArray[0]);
        report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3());
        report.getEDMSEntityIdModel().setAltId(itemCapId.getCustomID());

        report.setReportParameters(parameters);

        var permit = aa.reportManager.hasPermission(reportName, "APIUSER_GRAYQUARTER");
        if (permit.getOutput().booleanValue()) {
            var reportResult = aa.reportManager.getReportResult(report);
            if (reportResult) {
                logDebug("Report " + aaReportName + " has been run for " + itemCapId.getCustomID());
                return reportResult;
            }
        } else {
            logDebug("No permission to report: " + reportName + " for user: " + "APIUSER_GRAYQUARTER");
            return false;
        }
    }
    //Proxy function to make naming consistent
    gqRunReportAttach = runReportAttachGQ;

    scriptNULL = function(pval) {
        if (pval == "" || pval == null) {
            return 'undefined'
        }
        return pval;
    }

    gqHtmlEncode = function(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    gqGetACAUrl = function(itemCap, routeId) {

        // returns the path to the record on ACA.  Needs to be appended to the site    
        var enableCustomWrapper = lookup("ACA_CONFIGS", "ENABLE_CUSTOMIZATION_PER_PAGE");
        var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
        acaUrl = acaUrl.substr(0, acaUrl.toUpperCase().indexOf("/ADMIN"));
        var id1 = itemCap.getID1();
        var id2 = itemCap.getID2();
        var id3 = itemCap.getID3();
        var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();
        if (!routeId) {
            routeId = "1000";
        }
        acaUrl += "/urlrouting.ashx?type=" + routeId;
        acaUrl += "&Module=" + itemCapModel.getModuleName();
        acaUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
        acaUrl += "&agencyCode=" + aa.getServiceProviderCode();
        if (matches(enableCustomWrapper, "Yes", "YES"))
            acaUrl += "&FromACA=Y";

        return acaUrl;
    }


    /**
     * gqLoadGwizToEdms - Gets file uploads it to EDMS Solution
     * GwizGetFiles URL report must be pre-configured in report manager.  The report must have the parameter filename
     * the report must have permissions for the Module where the document will be uploaded to.
     * @param {string} edmsTarget Accela EDMS solution to upload to, get from EDMS Standard choice, case sensitive
     * @param {string} accelaModule Accela Module
     * @param {string} entId All Upper case, ent id to assocaited to CAP, REFCONTACT, LICENSEPROFESSIONAL
     * @param {*} entId if CAP then pass the capId, otherwise pass the appropriate entity ID.
     * @param {string} docGroup Accela Document Group to upload as
     * @param {string} docCategory Accela Document Category
     * @param {string} docDescription Description of document
     * @param {string} gwizFileName This is the filename from GWIZ session to capture
     */
    gqLoadGwizToEdms = function (edmsTarget, accelaModule, entType, entId, docGroup, docCategory, docDescription, gwizFileName) {
        // RUN THE URL REPORT
        var reportFile = gqRunUrlGetFile2Disk(gwizFileName, accelaModule);

        if (reportFile) {
            var documentObject = aa.document.newDocumentModel().getOutput();
            documentObject.setSourceName(edmsTarget);
            documentObject.setUserName("");
            documentObject.setPassword("");
            documentObject.setDocGroup(docGroup);
            documentObject.setDocCategory(docCategory);
            documentObject.setFileName(gwizFileName);
            documentObject.setDocDescription(docDescription);
            documentObject.setDocType("application/pdf");
            documentObject.setEntityType(entType);
            documentObject.setDocumentNo(null);

            if (entType == "CAP") {
                documentObject.setCapID(entId); // set to new cap id
                documentObject.setIdentifierDisplay(String(entId.getCustomID()))
                documentObject.setEntityID(entId.getID1() + "-" + entId.getID2() + "-" + entId.getID3());
            }
            else {
                documentObject.setCapID(null);
                documentObject.setEntityID(entId);
            }
            documentObject.setServiceProviderCode(aa.getServiceProviderCode());
            documentObject.setModuleName(accelaModule);

            //USE THE NEW aa.io TO READ THE FILE INTO THE DOCSTREAM
            var fileStream = aa.io.FileInputStream(reportFile);
            var newContentModel = aa.document.newDocumentContentModel().getOutput();
            newContentModel.setDocInputStream(fileStream);
            documentObject.setDocumentContent(newContentModel);
            var newDocResult = aa.document.createDocument(documentObject);

            //cleanup the report file
            aa.io.deleteFile(reportFile);

            if (newDocResult.getSuccess()) {
                var newDoc = newDocResult.getOutput();
                logDebug("Successfully uploaded document to EDMS");
                return true;
            } else {
                logDebug("Failed to uploaded document to EDMS: " + newDocResult.getErrorMessage());
                return false;
            }
        }
        else {
            logDebug("Failed to Download Report, please check GwizGetFiles exists in Report Manager");
        }
        return false;
    }

    /**
     * gqRunUrlGetFile2Disk - Gets file from Gwiz and saves to disk local to Accela Server.
     * @param {string} gwizFileName - File name for Gwiz
     * @param {string} accelaModule - Optional - Accela Module, must have permissions to GwizGetFiles
     * @returns - File path to document
     */
    gqRunUrlGetFile2Disk = function (gwizFileName, accelaModule) {

        if (accelaModule == null) {
            if (capId != null) {
                GQ_DEFAULT_MODULE = aa.cap.getCap(capId).getOutput().getCapModel().getModuleName();
                logDebug("Got Accela Module from CapId " + GQ_DEFAULT_MODULE);
            }
            else {
                var GQ_DEFAULT_MODULE = lookup("GRAYQUARTER", "WIZARD_DEFAULT_MODULE");
                if (!GQ_DEFAULT_MODULE || GQ_DEFAULT_MODULE == "") {
                    logDebug("GRAYQUARTER WIZARD_DEFAULT_MODULE field not configured in bizdomain. Default Building");
                    GQ_DEFAULT_MODULE = "Building";
                }
                else {
                    logDebug("GQ_DEFAULT_MODULE " + GQ_DEFAULT_MODULE + ". Update Std Choice GRAYQUARTER WIZARD_DEFAULT_MODULE to change");
                }
            }

            accelaModule = GQ_DEFAULT_MODULE;
        }

        reportName = "GwizGetFiles"; //MUST BE PRE-CONFIGURED IN REPORT MANAGER
        report = aa.reportManager.getReportInfoModelByName(reportName);
        report = report.getOutput();
        report.setModule(accelaModule);
        var reportParameters = aa.util.newHashMap();
        var fileName = gwizFileName;
        reportParameters.put("filename", fileName);
        logDebug("Get filename = " + fileName);
        report.setReportParameters(reportParameters);
        var urlReport = aa.reportManager.hasPermission(reportName, currentUserID);

        if (urlReport.getOutput().booleanValue()) {
            var reportResult = aa.reportManager.getReportResult(report);

            if (reportResult) {
                reportResult = reportResult.getOutput();
                var reportFile = aa.reportManager.storeReportToDisk(reportResult);
                logDebug("Report Result: " + reportResult);
                reportFile = reportFile.getOutput();
                logDebug("SUCCESS Report File = " + reportFile);
                return reportFile;
            }
            else {
                logDebug("gqRunUrlGetFile2Disk - Failed to get GwizGetFiles Report Result");
            }
        }
        else {
            logDebug("gqRunUrlGetFile2Disk - Failed to Run Report GwizGetFiles " + urlReport.getErrorMessage());
        }
        return null;
    }

    /**
     * gqGetGwizFileNameFromUrl - gets filename from url and returns as string
     */
    gqGetGwizFileNameFromUrl = function (url) {
        var gwizFileName = url.split('/').pop();
        return gwizFileName;
    }

    return this;
}
