var myCapId = "";
var myUserId = "ADMIN";
var eventName = "";

/* TEST  */  var eventName = "SCRIPT_TEST";
/* CTRCA */  //var eventName = "ConvertToRealCapAfter";
/* ASA   */  //var eventName = "ApplicationSubmitAfter";
/* ASIUA */  //var eventName = "ApplicationSubmitAfter";
/* WTUA  */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "License Issuance"; wfProcess = "XX"; wfComment = "XX";  wfStatus = "Issued";  wfDateMMDDYYYY = "01/27/2015";
/* IRSA  */  //var eventName = "InspectionResultSubmitAfter"; inspId=0;  inspType="Roofing"; inspResult="Failed"; inspResultComment = "Comment"; 
/* ISA   */  //var eventName = "InspectionScheduleAfter"; inspType = "Roofing";
/* PRA   */  //var eventName = "PaymentReceiveAfter";

var useProductInclude = true; //  set to true to use the "productized" include file (events->custom script), false to use scripts from (events->scripts)
var useProductScript = true;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.

/* master script code don't touch */ aa.env.setValue("EventName",eventName); var vEventName = eventName;  var controlString = eventName;  var tmpID = aa.cap.getCapID(myCapId).getOutput(); if(tmpID != null){aa.env.setValue("PermitId1",tmpID.getID1()); 	aa.env.setValue("PermitId2",tmpID.getID2()); 	aa.env.setValue("PermitId3",tmpID.getID3());} aa.env.setValue("CurrentUserID",myUserId); var preExecute = "PreExecuteForAfterEvents";var documentOnly = false;var SCRIPT_VERSION = 3.0;var useSA = false;var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { 	useSA = true; 		SA = bzr.getOutput().getDescription();	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS","SUPER_AGENCY_INCLUDE_SCRIPT"); 	if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); }	}if (SA) {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",SA,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",SA,useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript,SA,useProductScript));	}else {	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,useProductScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useProductScript));	}	eval(getScriptText("INCLUDES_CUSTOM",null,useProductInclude));if (documentOnly) {	doStandardChoiceActions2(controlString,false,0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();	}var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX",vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;  var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice ).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice ,"SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	}	function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)  servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo); if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) } if (runEvent && typeof(doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g,"\r");  aa.print(z);
logDebug("---RUNNING TEST CODE")
//
// User code goes here
//

try {
    var session = aa.env.getValue("gqinsession_id");
    // Get GWIZ Variables
    eval(getScriptText("GQ_WIZARD_LIBRARY"))
    var sessionObject = gqWizardLoadSession(session);
    var formData = sessionObject.formData;
    var sessionData = sessionObject.sessionData;

    // Create app type string
    recordTypeArray = [formData.record_group, formData.record_type, formData.record_subtype, formData.record_category];
    recordType = recordTypeArray.join("/");
    aa.env.setValue("recordType", recordType);

    // Get required documentation
    getNeededRecords(recordType);
    
    // Create temp record
    new_capId = createTempRecord(recordType);
    aa.env.setValue("appid", new_capId.getCustomID());
    
    // Get deeplink to temp record
    deeplink = gqGetACAUrl(new_capId, 1005);
    aa.env.setValue("deeplink", deeplink);

    // Relate contact to temp record
    contactSeqNum = getContactSeqNumFromEmail(formData.user_email);
    aa.env.setValue("newSeq", contactSeqNum);
    isContactRelated = addContactFromRef(new_capId, contactSeqNum);
    aa.env.setValue("isContactRelated", isContactRelated);

} catch (err) {
    aa.env.setValue("error", err);
}


// end user code
logDebug("---END OF TEST CODE")
// aa.env.setValue("ScriptReturnCode", "0"); 	
// aa.env.setValue("ScriptReturnMessage", debug);

//Custom Functions
function getContactSeqNumFromEmail(userEmail) {
    if (userEmail) {
        // Get Public User
        myUser = aa.publicUser.getPublicUserByEmail(userEmail);
        if (myUser.getSuccess() && myUser.getOutput()) {
            myUser = myUser.getOutput();
    
            // Get contacts from Public User
            userSeqNum = myUser.getUserSeqNum();
            refContactList = aa.people.getUserAssociatedContact(userSeqNum);
            if (refContactList.getSuccess()) {
                refContactList = refContactList.getOutput();
                logDebug("Number of contacts: " + refContactList.size());
                refContactList = refContactList.toArray();
    
                // Select contact with matching email or just first in list if none have a matching email.
                contact = refContactList[0];
                for ( i in refContactList) {
                    i_contact = refContactList[i];
                    if (i_contact.email == userEmail) {
                        contact = i_contact
                        break;
                    }
                }

                // return ContactSeqNum
                return contact.contactSeqNumber;
            }
        }
    }
}

function createTempRecord(recordType) {
    var recordTypeArray = recordType.split("/");
    ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();            
    ctm.setGroup(recordTypeArray[0]);
    ctm.setType(recordTypeArray[1]);
    ctm.setSubType(recordTypeArray[2]);
    ctm.setCategory(recordTypeArray[3]);
    //ctm.setSearchableInACA("Y");
    temp_capId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE EST").getOutput();
    return temp_capId;
}

function addContactFromRef(paramCap, contactRefNum) {
    var result = aa.people.getPeople(contactRefNum);
    if(!result.getSuccess()) {
        return "Error retrieving contact: " + result.getErrorMessage();;
    }

    var contact = result.getOutput();
    var addContact = aa.people.createCapContactWithRefPeopleModel(paramCap, contact);
    if(!addContact.getSuccess()) {
        return "Error adding reference contact to record: " + addContact.getErrorMessage();
    }
    return "Successfully added reference contact to record.";
}

// Main record lookup function
function getNeededRecords(recordType) {
    var debug = "";
    var br = "<br>";
    var AInfo = [];
    var showDebug = false; // only if needed, don't clog up g-wiz session
    var sysDate = aa.date.getCurrentDate();
    var startDate = new Date();
    var startTime = startDate.getTime(); // Start timer
    var systemUserObj = aa.person.getUser("ADMIN").getOutput();

    try {
        var docList = []; // list of documents to consolidate.
        var conditionId;
        var capContactId;
        var envParameters = aa.util.newHashMap(); // parameters for async portion

        var commentor = "Anonymous"; // default

        //aa.print(JSON.stringify(s));
        
        // remember that GQ caches this info.  may need code to refresh the session 
        // in certain cases, such as back button, etc.   var s = gqWizardLoadSession(session, "recapture=Y");
        
        if (recordType) {
            // aa.print(JSON.stringify(s));

            var headers = aa.util.newHashMap();
            headers.put("Content-Type", "application/json");
            var body = {};
            
            aa.print("recordType = " + recordType);
            body.type = recordType;

            var apiURL = lookup("DPR_CONFIGS", "ENDPOINT") + "/projects/types/checklist";

            var result = aa.httpClient.post(apiURL, headers, JSON.stringify(body));
            if (!result.getSuccess()) {
                aa.print("EPH error: " + result.getErrorMessage());
            } else {
                aa.print("EPH Output: " + result.getOutput());
                var docArray = JSON.parse(result.getOutput());
                if (!!docArray && docArray.length > 0) {
                    var outStr = "<UL>";
                    for (var i in docArray) {
                        var warningTextColor = "#5bc0de;";
                        if (docArray[i].actionType == "warning") {
                            warningTextColor = "#f0ad4e;";
                        } else if (docArray[i].actionType == "required") {
                            warningTextColor = "#d9534f;";
                        }
                        outStr += "<LI><B>"  + docArray[i].description + "</B><B style=color:" + warningTextColor + "> (" + docArray[i].actionType + ")</B>: " + docArray[i].message + "</LI>";
                    }
                    outStr+="</UL>";
                    aa.env.setValue("PlanReviewDocs", scriptNULL(outStr));
                    aa.print("EPH Results: " + outStr);
                }
            }
        } else {
            aa.print("no record type is g-gwiz session");
        }

    } catch (err) {
        aa.print(err);
        aa.env.setValue("debug", debug + ":" + err.message + " stack" + err.stack);
    }
}

// Record Lookup Sub Functions
function lookup(stdChoice, stdValue)
{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);

	if (bizDomScriptResult.getSuccess())
	{
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		var strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		aa.print("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
	}
	else
	{
		aa.print("lookup(" + stdChoice + "," + stdValue + ") does not exist");
	}
	return strControl;
}

function gqWizardLoadSession() {

    var urlVar = "";
    if (arguments.length == 2) {
        urlVar = "?" + arguments[1]; // used for session refresh and maybe more
    }

    var GQ_SESSION_ASI = lookup("GRAYQUARTER", "WIZARD_SESSION_ASI");
    if (arguments.length >= 1) {
        gqsession = arguments[0]; // use session id
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

    var resp = gqHttpClient((GQ_API_URL.replace("{0}", gqsession)) + urlVar, "GET", GQ_API_KEY);
    if (resp.code != 200) {
        aa.print("GRAYQUARTER Wizard API call failure.  Bad/mismatch API key?  Wizard session not started via GQ IPAAS? HTTPCode=" + resp.code);
    }

    var jobj = resp.body;

    return jobj;
}

function gqHttpClientGetBytes(url, apiKey, obj) {
    var connection;
    try {
        java.lang.System.setProperty("https.protocols", "TLSv1.2");
        var httpMethod = "GET";
        var javaUrl = new java.net.URL(url);
        connection = javaUrl.openConnection();
        connection.setRequestMethod(httpMethod);
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("User-Agent", "Accela");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setUseCaches(false);
        connection.setDoOutput(true);
        var statusCode = connection.getResponseCode();
        var response = false;
        if (statusCode >= 200 && statusCode < 300) {
            var bis = new java.io.BufferedInputStream(connection.getInputStream());
            var buf = new java.io.ByteArrayOutputStream();
            var result = bis.read();
            while (result != -1) {
                buf.write(result);
                result = bis.read();
            }
            response = new java.io.ByteArrayInputStream(buf.toByteArray());
        }
        return response;
    }
    finally {
        if (connection) {
            connection.disconnect();
        }
    }
}

function gqHttpClient(url, method, apiKey, obj) {
    var connection;
    try {
        java.lang.System.setProperty("https.protocols", "TLSv1.2");
        var httpMethod = method ? method : "GET";
        var javaUrl = new java.net.URL(url);
        connection = javaUrl.openConnection();
        connection.setRequestMethod(httpMethod);
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("Content-Type", "application/json");

        connection.setRequestProperty("X-API-Key", apiKey);

        connection.setUseCaches(false);
        connection.setDoOutput(true);
        if ((httpMethod.equals("POST") || httpMethod.equals("PUT")) && obj) {
            var payloadString = new java.lang.String(JSON.stringify(obj));
            var payload = payloadString.getBytes("UTF-8");
            var body;
            try {
                body = connection.getOutputStream();
                body.write(payload, 0, payload.length);
                body.flush();
            }
            finally {
                if (body) {
                    body.close();
                }
            }
        }
        var statusCode = connection.getResponseCode();
        var response = {
            code: statusCode
        };
        if (statusCode >= 200 && statusCode < 300) {
            var input;
            try {
                input = connection.getInputStream();
                if (input) {
                    var responseBuffer = new java.lang.StringBuffer();
                    var reader;
                    try {
                        reader = new java.io.BufferedReader(
                                new java.io.InputStreamReader(input));
                        var inputLine;
                        while ((inputLine = reader.readLine()) !== null) {
                            responseBuffer.append(inputLine);
                        }
                        var responseBody =
                            responseBuffer.length() > 0
                             ? JSON.parse(responseBuffer.toString())
                             : null;
                        response.body = responseBody;
                    }
                    finally {
                        if (reader) {
                            try {
                                reader.close();
                            } catch (err) {}
                        }
                    }
                }
            }
            finally {
                if (input) {
                    try {
                        input.close();
                    } catch (err) {}
                }
            }
        }
        return response;
    }
    finally {
        if (connection) {
            connection.disconnect();
        }
    }
}

function scriptNULL(pval) {
    if (pval == "" || pval == null) {
        return 'undefined'
    }
    return pval;
}