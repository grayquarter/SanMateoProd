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
    // // Unknown how phone number formatting will come through on the form.
    var session = aa.env.getValue("gqinsession_id");
    // // Get GWIZ Variables

    eval(getScriptText("GQ_WIZARD_LIBRARY"));
    var sessionObject = gqWizardLoadSession(session);
    var formData = sessionObject.formData;
    var sessionData = sessionObject.sessionData;
    var success = "error";
    var contact_seqnum;
    var user_seqnum;

    user_seqnum = getPublicUserSeqNum(formData.user_email);
    logDebug("My number: " + user_seqnum)
    if (!!user_seqnum) {
        success = "exists";
    } else {
        user_seqnum = newPublicUser(formData);
        if (!!user_seqnum) {
            success = "created";
        }
    }
    contact_seqnum = createRefContact(formData);
    
    if (!!user_seqnum && !!contact_seqnum) {
        logDebug("Contact Seq Num: " + contact_seqnum + " user: " + user_seqnum);
        result = aa.licenseScript.associateContactWithPublicUser(user_seqnum, contact_seqnum);
        if (result.getSuccess()) {
            logDebug("Successfully related the contact to the new public user.")
        } else {
            logDebug("Error relating the contact to public user: " + result.getErrorMessage());
        }
    }

    aa.env.setValue("GQ_PublicUser", success);

} catch (err) {
    aa.env.setValue("error", err);
}


// end user code
logDebug("---END OF TEST CODE")
//aa.env.setValue("ScriptReturnCode", "0"); 	
//aa.env.setValue("ScriptReturnMessage", debug);

//Custom Functions
function getPublicUserSeqNum(email) {
        // check to see if public user exists already based on email address
        var getUserResult = aa.publicUser.getPublicUserByEmail(email)
        if (getUserResult.getSuccess() && getUserResult.getOutput()) {
            userModel = getUserResult.getOutput();
            return userModel.getUserSeqNum();
        } else {
            return null;
        }
    
}

function createRefContact(contact) {
    var result = aa.people.createPeopleModel();
    if(!result.getSuccess()){
        logDebug("Error creating People Model.");
    }
    logDebug("Blank contact model created.");
    var peopleScriptModel = result.getOutput();
    var peopleModel = peopleScriptModel.getPeopleModel();

    logDebug("Adding properties to contact model.");
    peopleModel.setFirstName(contact.user_firstname);
    peopleModel.setLastName(contact.user_lastname);
    peopleModel.setRelation("Applicant");
    peopleModel.setPhone2(contact.user_phone);
    peopleModel.setEmail(contact.user_email);
    peopleModel.setFlag("Yes");
    peopleModel.setContactType("Individual");
    peopleModel.setServiceProviderCode(aa.getServiceProviderCode());
    peopleModel.setAuditID("ADMIN");
    peopleModel.setAuditStatus("A");
    logDebug("Adding contact model to ref table.");
    result = aa.people.createPeople(peopleModel);
    if (result.getSuccess()) {
        logDebug("Successfully added contact to ref table.");
    } else {
        logDebug("Error adding contact to ref table." + result.getErrorMessage());
    }
    var model_refetch = aa.people.getPeopleByPeopleModel(peopleModel);
    var contactSeqNum = model_refetch.getOutput()[0].contactSeqNumber;
    logDebug("New contacts sequence number: " + contactSeqNum);
    return contactSeqNum;
}


function newPublicUser(contact) {

    var contact;
    var userModel;

    // check to see if public user exists already based on email address
    logDebug("Checking to see if an account is already registered to this email.");
    var getUserResult = aa.publicUser.getPublicUserByEmail(contact.user_email)
    if (getUserResult.getSuccess() && getUserResult.getOutput()) {
        userModel = getUserResult.getOutput();
        logDebug("CreatePublicUserFromContact: Found an existing public user: " + userModel.getUserID());
    }

    // If no model exists with that email, create one
    if (!userModel) {
        logDebug("Creating new user based on email address: " + contact.user_email);
        var publicUser = aa.publicUser.getPublicUserModel();
        logDebug("Blank user model created.");
        logDebug("Adding properties to user model.")
        publicUser.setFirstName(contact.user_firstname);
        publicUser.setLastName(contact.user_lastname);
        publicUser.setEmail(contact.user_email);
        publicUser.setUserID(contact.user_email);
        publicUser.setPasswordRequestQuestion(contact.user_seqquestion);
        publicUser.setPasswordRequestAnswer(contact.user_seqanswer);
        publicUser.setPassword(aa.publicUser.encryptPassword(contact.user_pass).getOutput());
        publicUser.setAuditID("PublicUser");
        publicUser.setAuditStatus("A");
        publicUser.setCellPhone(contact.user_phone);

        logDebug("Creating the public user account.")
        var result = aa.publicUser.createPublicUser(publicUser);

        if (result.getSuccess()) {
            logDebug("Created public user " + contact.user_email + " sucessfully.");
            var userSeqNum = result.getOutput();
            var userModel = aa.publicUser.getPublicUser(userSeqNum).getOutput();

            // create for agency
            aa.publicUser.createPublicUserForAgency(userModel);

            // Activate for agency
            var userPinBiz = aa.proxyInvoker.newInstance("com.accela.pa.pin.UserPINBusiness").getOutput()
			userPinBiz.updateActiveStatusAndLicenseIssueDate4PublicUser(aa.getServiceProviderCode(), userSeqNum,"ADMIN");

            return userSeqNum;
        } else {
            logDebug("Error: " + result.getErrorMessage());
            return null;
        }
    }
}
