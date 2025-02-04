// @ts-check
/*
call from gwiz webhook example (no other parms needed): &script=GQ_REGISTER_WIZ
*/

// testing
//aa.env.setValue("gqinsession_id", "27bd1f3aa4ec4fa6988b5a482487a746");

var currentUserID = "ADMIN";
var session = decodeURIComponent(String(aa.env.getValue("gqinsession_id")));

/*------------------------------------------------------------------------------------------------------/
| GLOBAL VARIABLES
/------------------------------------------------------------------------------------------------------*/
var debug = "";
var br = "<br>";
var AInfo = [];
var showDebug = false; // only if needed, don't clog up g-wiz session
var sysDate = aa.date.getCurrentDate();
var startDate = new Date();
var startTime = startDate.getTime(); // Start timer
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var batchJobResult = aa.batchJob.getJobID();
var batchJobName = "" + aa.env.getValue("BatchJobName");
var batchJobID = 0;
var sleepInterval = 1 * 3 * 1000; // sleep 3 seconds if not complete
/*------------------------------------------------------------------------------------------------------/
| INCLUDE SCRIPTS (Core functions, batch includes, custom functions)
/------------------------------------------------------------------------------------------------------*/
SCRIPT_VERSION = 3.0;
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));
eval(getScriptText("INCLUDES_CUSTOM", null, true));

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode)
        servProvCode = aa.getServiceProviderCode();
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        if (useProductScripts) {
            var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
        } else {
            var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
        }
        return emseScript.getScriptText() + "";
    } catch (err) {
        return "";
    }
}

//
// User code goes here
//

try {
    var acaAdminUrl = lookup("ACA_CONFIGS", "ACA_SITE");
    var env = lookup("EMSE_ENVIRONMENT", "ENVIRON");
    var licLink = "https://partner08-test-av.accela.com/portlets/professional/ref/refProfessionalDetail.do?value(mode)=edit&value%28licSeqNbr%29=$$LICSEQNBR$$&isFromProfList=true";
    //var conLink = "https://partner08-test-av.accela.com/portlets/contact/ref/refContactDetail.do?value(mode)=view&value(contactSeqNumber)=$$CONTACTNBR$$&value(lookup)=false&isFromContactList=true";
    var conLink = "https://partner08-test-av.accela.com/portlets/reports/adHocReport.do?mode=deepLink&reportCommand=contactDetail&contactSeqNumber=$$CONTACTNBR$$"
    var puLink = "https://partner08-test-av.accela.com/portlets/publicuser/publicUserFormAdmin.do?mode=view&userSeqNum=$$PUBLICUSERSEQ$$";


    var acaUrl = acaAdminUrl.substr(0, acaAdminUrl.toUpperCase().indexOf("/ADMIN"));
    var newCommentUrl = acaUrl + "/customization/comments/default.aspx";
    var capId = null; // our comment record
    var docList = []; // list of documents to consolidate.
    var conditionId;
    var capContactId;



    var s = gqWizardLoadSessionLocal(session);
    loadGwizToEdms = null;
    if (s) {

        // Get GWIZ field data
        var a = s.formData;
        var lpNumber = a.licenseNumber + "";
        var pubUserId = a.publicUserID + "";
        var deptToNotify = a.DeptNotify + "";
        var registrationType = a.registrationType + "";
        aa.print("Public User ID: " + pubUserId);
        aa.print("registrationType: " + registrationType);



        // Get public user based on the userID from GWIZ session.
        var pUserSeqID4Email = "";
        var pConSeqID4Email = "";
        var pUserEmailAddress = "";
        var pUser = aa.publicUser.getPublicUserByUserId(pubUserId);
        if (pUser.getSuccess() && pUser.getOutput()) {
            pUser = pUser.getOutput();
            pUserEmailAddress = String(pUser.getEmail());
            // Get the publicUser associated contact.
            var pUserSeqID4Email = pUser.userSeqNum;
            var pUserContact = aa.people.getUserAssociatedContact(pUserSeqID4Email);
            if (pUserContact.getSuccess() && pUserContact.getOutput()) {
                pUserContact = pUserContact.getOutput();
                pConSeqID4Email = pUserContact.toArray()[0].contactSeqNumber;
            }
        }
        puLink = puLink.replace("$$PUBLICUSERSEQ$$", String(pUserSeqID4Email));
        conLink = conLink.replace("$$CONTACTNBR$$", String(pConSeqID4Email));

        // **Fire Inspection Report
        if (a.toFireDept == "true") {
            // Get public user based on the userID from GWIZ session.
            var pUser = aa.publicUser.getPublicUserByUserId(pubUserId);
            if (pUser.getSuccess() && pUser.getOutput()) {
                pUser = pUser.getOutput();

                // Get the publicUser associated contact.
                var pUserSeq = pUser.userSeqNum;
                var pUserContact = aa.people.getUserAssociatedContact(pUserSeq);
                if (pUserContact.getSuccess() && pUserContact.getOutput()) {
                    pUserContact = pUserContact.getOutput();
                    //TODO always index 0 or should it be checked?
                    var userSeq = pUserContact.toArray()[0].contactSeqNumber;
                    var refID = parseInt(userSeq, 10);
                    var person = aa.people.getPeople(refID).getOutput();
                    if (!!person) {

                        // Add documents to the contact.
                        var fileTypes = ["DL_ID", "OtherDocuments"];
                        for (var i in fileTypes) {
                            if (!!s.formData[fileTypes[i]]) {
                                aa.print("File Recieved: " + fileTypes[i]);
                                var url = s.formData[fileTypes[i]];
                                var gwizFileName = url.split('/').pop().replace(session + "-", "");
                                var success = loadGwizToEdmsLocal("ADS", "Building", "REFCONTACT", String(refID)
                                    , "ACA FIRE", "Letters and Documents", "ACA Registration Document"
                                    , gwizFileName);

                                aa.print("loadGwizToEdmsLocal Returned " + success);

                            } else {
                                aa.print("Missing File: " + fileTypes[i]);
                            }
                        }

                        // Send email to the appropriate department staff.
                        var params = aa.util.newHashtable();
                        params.put("$$Environment$$", env);
                        params.put("$$UserId$$", pubUserId);
                        params.put("$$LpNumber$$", "Not Applicable");
                        params.put("$$ActivityInfo$$", "Not Applicable");
                        params.put("$$RegistrationType$$", "Owner");
                        params.put("$$PublicUserLink$$", puLink);
                        params.put("$$DocReviewLink$$", conLink);
                        params.put("$$pUserEmailAddress$$", pUserEmailAddress);
                        var notificationTemplate = "GWIZ_ACA_REGISTRATION";
                        tmpl = aa.communication.getNotificationTemplate(notificationTemplate).getOutput();
                        if (tmpl != null) {
                            var agencyReplyEmail = 'Auto_Sender@Accela.com'//tmpl.getEmailTemplateModel().getFrom();
                            var emailTo = "dane@grayquarter.com;anthony@grayquarter.com;marshall@grayquarter.com";
                            emailCC = tmpl.getEmailTemplateModel().getCc();
                            aa.print("Sending Template " + notificationTemplate + " to " + emailTo + " from " + agencyReplyEmail);
                            result = aa.document.sendEmailByTemplateName(agencyReplyEmail, emailTo, emailCC, notificationTemplate, params, null);
                        }
                    }
                }
            }
            //  **PROFESSIONAL
        } else if (registrationType == "PROFESSIONAL") {
            //generate reflp if missing
            externalLP_CA(lpNumber, "Contractor", true, false, null);

            // If lpNumber field was filled out in GWIZ
            if (lpNumber != null && lpNumber != "") {
                var newLic = getRefLicenseProf(lpNumber)
                var licSeqNbr = newLic.getLicSeqNbr();
                licLink = licLink.replace("$$LICSEQNBR$$", String(licSeqNbr));
                // If lp exists
                if (licSeqNbr) {
                    aa.print("License Sequence Number: " + licSeqNbr);

                    // Add documents to LP
                    var fileTypes = ["ContractorAgreement", "ContractorsLicense", "CityBusinessLicense"];
                    for (var i in fileTypes) {
                        if (!!s.formData[fileTypes[i]]) {
                            aa.print("File Recieved: " + fileTypes[i]);
                            var url = s.formData[fileTypes[i]];
                            var gwizFileName = url.split('/').pop().replace(session + "-", "");
                            var success = loadGwizToEdmsLocal("ADS", "Building", "LICENSEPROFESSIONAL", String(licSeqNbr)
                                , "BLD_GENERAL", "BLD-Other", "ACA Registration Document"
                                , gwizFileName);

                            aa.print("loadGwizToEdmsLocal Returned " + success);

                        } else {
                            aa.print("Missing File: " + fileTypes[i]);
                        }
                    }

                    // Send email to the appropriate department staff.
                    var params = aa.util.newHashtable();
                    params.put("$$Environment$$", env);
                    params.put("$$UserId$$", pubUserId);
                    params.put("$$LpNumber$$", lpNumber);
                    params.put("$$ActivityInfo$$", deptToNotify);
                    params.put("$$RegistrationType$$", "Licensed Professional");
                    params.put("$$PublicUserLink$$", puLink);
                    params.put("$$DocReviewLink$$", licLink);
                    params.put("$$pUserEmailAddress$$", pUserEmailAddress);

                    var notificationTemplate = "GWIZ_ACA_REGISTRATION";
                    var tmpl = aa.communication.getNotificationTemplate(notificationTemplate).getOutput();
                    if (tmpl != null) {
                        var agencyReplyEmail = 'Auto_Sender@Accela.com'//tmpl.getEmailTemplateModel().getFrom();
                        var emailTo = "dane@grayquarter.com;anthony@grayquarter.com;marshall@grayquarter.com";
                        var emailCC = tmpl.getEmailTemplateModel().getCc();
                        aa.print("Sending Template " + notificationTemplate + " to " + emailTo + " from " + agencyReplyEmail);
                        var result = aa.document.sendEmailByTemplateName(agencyReplyEmail, emailTo, emailCC, notificationTemplate, params, null);
                    }
                }
            }
            // ** OWNER
        } else if (registrationType == "OWNER") {
            // Get public user based on the userID from GWIZ session.
            var pUser = aa.publicUser.getPublicUserByUserId(pubUserId);
            if (pUser.getSuccess() && pUser.getOutput()) {
                pUser = pUser.getOutput();

                // Get the publicUser associated contact.
                var pUserSeq = pUser.userSeqNum;
                var pUserContact = aa.people.getUserAssociatedContact(pUserSeq);
                if (pUserContact.getSuccess() && pUserContact.getOutput()) {
                    pUserContact = pUserContact.getOutput();
                    //TODO always index 0 or should it be checked?
                    var userSeq = pUserContact.toArray()[0].contactSeqNumber;
                    var refID = parseInt(userSeq, 10);
                    var person = aa.people.getPeople(refID).getOutput();
                    if (!!person) {

                        // Add documents to the contact.
                        var fileTypes = ["RecordedGrantDeed", "StateId", "OwnerBuilderUserAgreementForm"];
                        for (var i in fileTypes) {
                            if (!!s.formData[fileTypes[i]]) {
                                aa.print("File Recieved: " + fileTypes[i]);
                                var url = s.formData[fileTypes[i]];
                                var gwizFileName = url.split('/').pop().replace(session + "-", "");
                                var success = loadGwizToEdmsLocal("ADS", "Building", "REFCONTACT", String(refID)
                                    , "ACA FIRE", "Letters and Documents", "ACA Registration Document"
                                    , gwizFileName);

                                aa.print("loadGwizToEdmsLocal Returned " + success);

                            } else {
                                aa.print("Missing File: " + fileTypes[i]);
                            }
                        }

                        // Send email to the appropriate department staff.
                        var params = aa.util.newHashtable();
                        params.put("$$Environment$$", env);
                        params.put("$$UserId$$", pubUserId);
                        params.put("$$LpNumber$$", "Not Applicable");
                        params.put("$$ActivityInfo$$", "Not Applicable");
                        params.put("$$RegistrationType$$", "Owner");
                        params.put("$$PublicUserLink$$", puLink);
                        params.put("$$DocReviewLink$$", conLink);
                        params.put("$$pUserEmailAddress$$", pUserEmailAddress);
                        var notificationTemplate = "GWIZ_ACA_REGISTRATION";
                        tmpl = aa.communication.getNotificationTemplate(notificationTemplate).getOutput();
                        if (tmpl != null) {
                            var agencyReplyEmail = 'Auto_Sender@Accela.com'//tmpl.getEmailTemplateModel().getFrom();
                            var emailTo = "dane@grayquarter.com;anthony@grayquarter.com;marshall@grayquarter.com";
                            emailCC = tmpl.getEmailTemplateModel().getCc();
                            aa.print("Sending Template " + notificationTemplate + " to " + emailTo + " from " + agencyReplyEmail);
                            result = aa.document.sendEmailByTemplateName(agencyReplyEmail, emailTo, emailCC, notificationTemplate, params, null);
                        }
                    }
                }
            }
            //  ** AGENT
        } else if (registrationType == "AGENT") {
            //generate reflp if missing
            externalLP_CA(lpNumber, "Contractor", true, false, null);

            // If lpNumber field was filled out in GWIZ
            var newLic = getRefLicenseProf(lpNumber)
            var licSeqNbr = newLic.getLicSeqNbr();
            licLink = licLink.replace("$$LICSEQNBR$$", String(licSeqNbr));
            aa.print("licSeqNbr=" + licSeqNbr);

            // If LP exists.
            if (lpNumber != null && lpNumber != "") {
                var newLic = getRefLicenseProf(lpNumber)
                var licSeqNbr = newLic.getLicSeqNbr();

                // Add documents to LP
                // TODO 
                if (licSeqNbr) {
                    var fileTypes = ["ContractorAgreement", "ContractorsLicense", "DriversLicenseIDCard", "AgencyOwnersLetter"];
                    for (var i in fileTypes) {
                        if (!!s.formData[fileTypes[i]]) {
                            aa.print("File Recieved: " + fileTypes[i]);
                            var url = s.formData[fileTypes[i]];
                            var gwizFileName = url.split('/').pop().replace(session + "-", "");
                            var success = loadGwizToEdmsLocal("ADS", "Building", "LICENSEPROFESSIONAL", String(licSeqNbr)
                                , "BLD_GENERAL", "BLD-Other", "ACA Registration Document"
                                , gwizFileName);

                            aa.print("loadGwizToEdmsLocal Returned " + success);

                        } else {
                            aa.print("Missing File: " + fileTypes[i]);
                        }
                    }


                    // Send email to the appropriate department staff.
                    var params = aa.util.newHashtable();
                    params.put("$$Environment$$", env);
                    params.put("$$UserId$$", pubUserId);
                    params.put("$$LpNumber$$", lpNumber);
                    params.put("$$RegistrationType$$", "Agent");
                    params.put("$$ActivityInfo$$", deptToNotify);
                    params.put("$$PublicUserLink$$", puLink);
                    params.put("$$DocReviewLink$$", licLink);
                    params.put("$$pUserEmailAddress$$", pUserEmailAddress);

                    var notificationTemplate = "GWIZ_ACA_REGISTRATION";
                    tmpl = aa.communication.getNotificationTemplate(notificationTemplate).getOutput();
                    if (tmpl != null) {
                        var agencyReplyEmail = 'Auto_Sender@Accela.com'//tmpl.getEmailTemplateModel().getFrom();
                        var emailTo = "dane@grayquarter.com;anthony@grayquarter.com;marshall@grayquarter.com";
                        emailCC = tmpl.getEmailTemplateModel().getCc();
                        aa.print("Sending Template " + notificationTemplate + " to " + emailTo + " from " + agencyReplyEmail);
                        result = aa.document.sendEmailByTemplateName(agencyReplyEmail, emailTo, emailCC, notificationTemplate, params, null);
                    }
                }
            }
        }
        // Send confirmation email to the applicant.
        // Get the public users primary email
        var confirmationEmailAddress;
        var pUser = aa.publicUser.getPublicUserByUserId(pubUserId);
        if (pUser.getSuccess() && pUser.getOutput()) {
            pUser = pUser.getOutput();
            confirmationEmailAddress = pUser.email;
            if (confirmationEmailAddress) {
                var notificationTemplate = "GWIZ_ACA_REGISTRATION_CONFIRMATION";
                tmpl = aa.communication.getNotificationTemplate(notificationTemplate).getOutput();
                if (tmpl != null) {
                    var agencyReplyEmail = 'Auto_Sender@Accela.com'//tmpl.getEmailTemplateModel().getFrom();
                    var emailTo = "dane@grayquarter.com;anthony@grayquarter.com;marshall@grayquarter.com";
                    aa.print("Sending Template " + notificationTemplate + " to " + emailTo + " from " + agencyReplyEmail);
                    result = aa.document.sendEmailByTemplateName(agencyReplyEmail, emailTo, "", notificationTemplate, params, null);
                }
            }
        }
    }
} catch (err) {
    aa.print(err)
    aa.print(err);
    aa.env.setValue("debug", debug + ":" + err.message + " stack" + err.stack);
}
if (showDebug) {
    aa.env.setValue("debug", debug);
    aa.env.setValue("ScriptReturnCode", "0");
    aa.env.setValue("ScriptReturnMessage", debug)
}


function gqWizardLoadSessionLocal(gqsession) {

    var GQ_SESSION_ASI = lookup("GRAYQUARTER", "WIZARD_SESSION_ASI");

    if (arguments.length == 1) {
        var gqsession = arguments[0]; // use session id
        aa.print("GRAYQUARTER USING SESSION ID : " + gqsession);
    } else {

        if (!GQ_SESSION_ASI || GQ_SESSION_ASI == "") {
            aa.print("GRAYQUARTER WIZARD_SESSION_ASI field not configured in bizdomain");
            return false;
        }

        var gqsession = AInfo[GQ_SESSION_ASI];
        if (!gqsession || gqsession == "") {
            aa.print("GRAYQUARTER WIZARD_SESSION_ASI field (" + GQ_SESSION_ASI + ") has no value, exiting");
            return false;
        }
    }

    var GQ_API_KEY = lookup("GRAYQUARTER", "WIZARD_API_KEY");

    if (!GQ_API_KEY || GQ_API_KEY == "") {
        aa.print("GRAYQUARTER Wizard API key not configured");
        return false;
    }

    var GQ_API_URL = lookup("GRAYQUARTER", "WIZARD_API_URL");
    if (!GQ_API_URL || GQ_API_URL == "") {
        aa.print("GRAYQUARTER Wizard URL key not configured");
        return false;
    }

    var header = aa.httpClient.initPostParameters();
    header.put("X-API-Key", GQ_API_KEY);
    var respOut = aa.httpClient.get(GQ_API_URL.replace("{0}", gqsession), header);
    if (!respOut.getSuccess()) {
        aa.print("GRAYQUARTER Wizard API call failure.  Bad/mismatch API key?  Wizard session not started via GQ IPAAS?");
        return false;
    }

    var resp = respOut.getOutput();

    if (!resp || resp == "") {
        aa.print("GRAYQUARTER Wizard API returns null.  Bad/mismatch API key?  Wizard session not started via GQ IPAAS?");
        return false;
    }

    var jobj = JSON.parse(resp);

    return jobj;
}


/**
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
function loadGwizToEdmsLocal(edmsTarget, accelaModule, entType, entId, docGroup, docCategory, docDescription, gwizFileName) {
    // RUN THE URL REPORT
    reportName = "GwizGetFiles"; //MUST BE PRE-CONFIGURED IN REPORT MANAGER
    report = aa.reportManager.getReportInfoModelByName(reportName);
    report = report.getOutput();

    report.setModule(accelaModule);

    var reportParameters = aa.util.newHashMap();
    var fileName = gwizFileName;
    reportParameters.put("filename", fileName);
    aa.print("Get filename = " + fileName);
    report.setReportParameters(reportParameters);
    var urlReport = aa.reportManager.hasPermission(reportName, currentUserID);

    if (urlReport.getOutput().booleanValue()) {
        var reportResult = aa.reportManager.getReportResult(report);

        if (reportResult) {
            reportResult = reportResult.getOutput();
            var reportFile = aa.reportManager.storeReportToDisk(reportResult);
            aa.print("Report Result: " + reportResult);
            reportFile = reportFile.getOutput();
            aa.print("SUCCESS Report File = " + reportFile);

            var documentObject = aa.document.newDocumentModel().getOutput();
            documentObject.setSourceName(edmsTarget);
            documentObject.setUserName("");
            documentObject.setPassword("");
            documentObject.setDocGroup(docGroup);
            documentObject.setDocCategory(docCategory);
            documentObject.setFileName(fileName);
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
                aa.print("Successfully uploaded document to EDMS");
                return true;
            } else {
                aa.print("Failed to uploaded document to EDMS: " + newDocResult.getErrorMessage());
                return false;
            }


        } else {
            aa.print("Unable to run report, please update Report Manager: " + reportName);
            return false;

        }
    } else {
        aa.print("No permission to report, please update Report Manager: " + reportName);
        return false;
    }
}



function explore(objExplore) {
    aa.print("Methods:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) == "function") {
            aa.print("<font color=blue><u><b>" + x + "</b></u></font> ");
            aa.print("   " + objExplore[x] + "<br>");
        }
    }
    aa.print("");
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) != "function") aa.print("  <b> " + x + ": </b> " + objExplore[x]);
    }
}

function props(objExplore) {
    aa.print("Properties:")
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) != "function") {
            aa.print("  <b> " + x + ": </b> " + objExplore[x]);
            aa.print(x + " : " + objExplore[x]);
        }
    }
}