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
    var testSessionId;
    // testSessionId = "eac3abb509b446cf92e608e24b9420b1";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
eval(getScriptText("GQ_WIZARD_LIBRARY"))
var sessionObject = gqWizardLoadSession(gq_session);
var formData = sessionObject.formData;
var sessionData = sessionObject.sessionData;
// props(formData);

var hasDuplicate = false;
var records = aa.cap.getByAppType("Planning", "Accelarate", "Giveaway", "Entry").getOutput();
records.forEach(function (record) {
    var capContacts = aa.people.getCapContactByCapID(record.getCapID()).getOutput();
    capContacts.forEach(function (capContact) {
        if (String(capContact.people.email).toLowerCase() == String(formData.email).toLowerCase()) {
            logDebug("Duplicate Found: " + capContact.people.email + " == " + formData.email + "")
            hasDuplicate = true;
        }
    });
});
logDebug("hasDuplicate: " + hasDuplicate);
aa.env.setValue("hasDuplicate", String(hasDuplicate));
if (!hasDuplicate) {
    logDebug("Creating Record")
    var projName = formData.fName + " " + formData.lName + " - " + formData.org;
var capId = createCap("Planning/Accelarate/Giveaway/Entry", "TEST REC");
// props(capId);

// create the contact
var c = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.CapContactModel").getOutput();
var p = aa.people.getPeopleModel();

p.setServiceProviderCode(aa.getServiceProviderCode());
p.setFirstName(formData.fName);
// p.setMiddleName();
p.setLastName(formData.lName);
p.setEmail(formData.email);
p.title = formData.title;
p.businessName = formData.org;
p.phone1 = formData.phone;
var ptb = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.PeopleTemplateBusiness").getOutput();
// go get ref people attrs
// var templateCollection = ptb.getPeopleAttributes(aa.getServiceProviderCode(), "Commentor", null, null, false, "ADMIN");
// logDebug("templateCollection:" + templateCollection);
// p.setAttributes(templateCollection);
c.setPeople(p);
c.primaryFlag = "Y";

var contactType = "Y";
c.setContactType("Entrant");
c.setCapID(capId);

// set attributes

result = aa.people.createCapContactWithAttribute(c);
logDebug("Created Record: " + capId.getCustomID());

aa.env.setValue("altId", capId.getCustomID());
aa.env.setValue("deepLink", gqGetACAUrl(capId));
}

}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
aa.env.setValue("ScriptReturnCode", "0"); 	aa.env.setValue("ScriptReturnMessage", debug)

//Custom Functions


//Utility Functions
function props(objExplore) {
    logDebug("Properties:")
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) != "function") {
            logDebug("  <b> " + x + ": </b> " + objExplore[x]);
            aa.print( x + " : " + objExplore[x]);
        }   
    }
}