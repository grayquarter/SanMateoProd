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
slack("In the create record script");
//
// User code goes here
//
var testSessionId;
// testSessionId = "d3a7707bdfe14ea39df1098806f8fbea";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
eval(getScriptText("GQ_WIZARD_LIBRARY"))
var sessionObject = gqWizardLoadSession(gq_session);
var formData = sessionObject.formData;
var sessionData = sessionObject.sessionData;

try {

    var recordTypes = formData.recordTypes.split(",");
    var recordInfoList = [];

    for (var i in recordTypes) {
        var recordType = recordTypes[i];
        var recordInfo = {};

        // Create the temporary record 
        var new_capId = createTempRecord(recordType);

        // Add customID to session
        logDebug("New Temp Record: " + new_capId.customID);
        recordInfo.customID = new_capId.customID;
        aa.env.setValue("appid", String(new_capId.customID));

        
        // Add session number to record.
        var newCap = aa.cap.getCap(new_capId).getOutput();
        var newCapModel = newCap.getCapModel();
        var gq_session_1 = gq_session.substring(0, 16);
        var gq_session_2 = gq_session.substring(16);
        newCapModel.setQUD1(String(gq_session_1));
        newCapModel.setQUD2(String(gq_session_2));
        var addSession_Result = aa.cap.editCapByPK(newCapModel);
        logDebug("Added session #" + gq_session + " to record: " + addSession_Result.getSuccess());
        
        // Add simple record alias to session.
        var simpleRecordName = newCap.capModel.appTypeAlias;
        recordInfo.recordType = simpleRecordName;
        aa.env.setValue("recordType", simpleRecordName);
        
        // Set ASI fields
        var completedASI = {};
        for (var x in formData) {
            // if the key begins and ends with '-' then it is an ASI field
            if (x[0] == '-' && x[x.length - 1] == '-') {
                var fieldValue = formData[x];
                if (!!fieldValue && fieldValue.indexOf("-,-") > -1) {
                    var fieldValueArray = fieldValue.split("-,-");
                    if (fieldValueArray.length < i) {
                        continue;
                    }
                    fieldValue = fieldValueArray[i];
                }
                if (fieldValue == "0") fieldValue = null;
                if (fieldValue) fieldValue = fieldValue.replace("&amp;", "&");
                var fieldLabel = lookup("GWIZ_ASI_MAP", x);
                if (fieldLabel) {
                    logDebug("Record: " + i + " , Field: " + x + " , Value: " + fieldValue);
                    logDebug("Setting ASI field \'" + fieldLabel + "\' to \'" + fieldValue + "\'");
                    editAppSpecific(fieldLabel, fieldValue, new_capId);
                    if (!!fieldValue) {
                        completedASI[fieldLabel] = fieldValue;
                    }
                }
            }
        }
        var textString;
        // If completedASI has any entries, create text to display back in GWIZ.
        if (Object.keys(completedASI).length > 0) {
            textString = '';
            for (var key in completedASI) {
                textString += '<p>' + key + ': ' + completedASI[key] + '</p>';
            }
        } else {
            textString = "None";
        }
        // logDebug("ASI Table: " + htmlString);
        recordInfo.asiTable = textString;
        aa.env.setValue("asiTable", textString);

        // Associate Public User to the new Temp record
        var gqpublicUser = formData.publicUserID
        if (!!gqpublicUser && new_capId) {
            var contactSuccess = addPublicUserToRecordAsContact(gqpublicUser, new_capId, "Applicant");
            logDebug("Attempt to add contact to record: " + contactSuccess);
        } else {
            logDebug("publicUserID not found. Skipping public user creation step.");
        }

        // Generate deep link
        if (new_capId) {
            var acaUrl = gqGetCustomACAUrl(new_capId, 1005);
            // logDebug("New URL: " + acaUrl);
            aa.env.setValue("deeplink", acaUrl);
            recordInfo.deeplink = acaUrl;
        }
        recordInfoList.push(recordInfo);
    }
    aa.env.setValue("recordInfoList", displayRecords(recordInfoList));
    logDebug(displayRecords(recordInfoList));
}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
if(testSessionId) {aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug);}

//Custom Functions

function createTempRecord(recordType) {
    var recordTypeArray = recordType.split("/");
    var ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();            
    ctm.setGroup(recordTypeArray[0]);
    ctm.setType(recordTypeArray[1]);
    ctm.setSubType(recordTypeArray[2]);
    ctm.setCategory(recordTypeArray[3]);
    //ctm.setSearchableInACA("Y");
    var temp_capId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE EST").getOutput();
    return temp_capId;
}

function addPublicUserToRecordAsContact(publicUserId, itemCapId, contactType) {
    var getUserResult = aa.publicUser.getPublicUserByUserId(publicUserId);
    if (!getUserResult.getSuccess()) {
        logDebug("addPublicUserToRecordAsContact: could not get public user " + getUserResult.getErrorMessage);
        return false;
    }
    var userModel = getUserResult.getOutput();
    if (!userModel) {
        logDebug("addPublicUserToRecordAsContact: user Model is empty");
        return false;
    }
    var userSeqNum = userModel.getUserSeqNum();
    var refContact = getRefContactForPublicUser(userSeqNum);
    if (!refContact) {
        logDebug("addPublicUserToRecordAsContact: refContact is empty");
        return false;
    }
    var refContactNum = refContact.getContactSeqNumber();
    refContact.setContactAddressList(getRefAddContactList(refContactNum));
    var capContactModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.CapContactModel").getOutput();
    capContactModel.setPeople(refContact);
    capContactModel.setSyncFlag("Y");
    capContactModel.setRefContactNumber(refContactNum);
    capContactModel.setContactType(contactType);
    capContactModel.setCapID(itemCapId);
    var createResult = aa.people.createCapContactWithAttribute(capContactModel);
    if (!createResult.getSuccess()) {
        logDebug("addPublicUserToRecordAsContact: createCapContact Failed " + createResult.getErrorMessage());
        return false;
    }
    return true;
}

function getRefAddContactList(peoId) {
    var conAdd = aa.proxyInvoker.newInstance("com.accela.orm.model.address.ContactAddressModel").getOutput();
    conAdd.setEntityID(parseInt(peoId));
    conAdd.setEntityType("CONTACT");
    var addList = aa.address.getContactAddressList(conAdd).getOutput();
    var tmpList = aa.util.newArrayList();
    var pri = true;
    for (x in addList) {
        if (pri) {
            pri = false;
            addList[x].getContactAddressModel().setPrimary("Y");
        }
        tmpList.add(addList[x].getContactAddressModel());
    }

    return tmpList;
}

function getRefContactForPublicUser(userSeqNum) {
    var contractorPeopleBiz = aa.proxyInvoker.newInstance("com.accela.pa.people.ContractorPeopleBusiness").getOutput();
    var userList = aa.util.newArrayList();
    userList.add(userSeqNum);
    var peopleList = contractorPeopleBiz.getContractorPeopleListByUserSeqNBR(aa.getServiceProviderCode(), userList);
    if (peopleList != null) {
        var peopleArray = peopleList.toArray();
        if (peopleArray.length > 0)
            return peopleArray[0];
    }
    return null;
}

function gqGetCustomACAUrl(itemCap, routeId) {

    // returns the path to the record on ACA.  Needs to be appended to the site    
    var enableCustomWrapper = lookup("ACA_CONFIGS", "ENABLE_CUSTOMIZATION_PER_PAGE");
    var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
    acaUrl = acaUrl.substr(0, acaUrl.toUpperCase().indexOf("/ADMIN"));
    var id1 = itemCap.getID1();
    var id2 = itemCap.getID2();
    var id3 = itemCap.getID3();
    var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();
    if(!routeId) {
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

function displayRecords(records) {
    var output = '<table><tbody>';
    
    for (var i in records) {
        var record = records[i];
        var customID = record.customID || "";
        var recordType = record.recordType || "";
        var asiTable = record.asiTable || "";
        var deeplink = record.deeplink || "";
        
        output += '<div><p>' + customID + ' - ' + recordType + '</p><p>Pre-filled data:<br> ' + asiTable + '</p><p><a href="' + deeplink + '">Go to record</a></p><hr/></div>';
    }

    output += '</tbody></table>';
    
    return output;
}

function slack(msg) {
    if(msg.indexOf("<BR>") >= 0) {
        msg.replace(/<BR>/g, "\n");
    }
    var headers=aa.util.newHashMap();
    headers.put("Content-Type","application/json");
    var body = {};  
    body.text = aa.getServiceProviderCode() + ":" + "SUPP" + ": " + msg;
    //GQ Slack
    var SLACKURL = "https://hooks.slack.com/services/";
    SLACKURL = SLACKURL + "T5BS1375F/";
    SLACKURL = SLACKURL + "B04FYRTLEEQ/RJUIqodbkT3c7XbOZdnYbcal";
    var apiURL = SLACKURL;  // from globals
    var result = aa.httpClient.post(apiURL, headers, JSON.stringify(body));
    if (!result.getSuccess()) {
        logDebug("Slack get anonymous token error: " + result.getErrorMessage());
    } else {    
        aa.print("Slack Results: " + result.getOutput());
    }
}
