//showDebug=true;
if(currentUserID=="EMSEDEBUG"){
    showDebug=true;
}
/*------------------------------------------------------------------------------------------------------/
| Accela Automation
| Accela, Inc.
| Copyright (C): 2012
|
| Program : INCLUDES_CUSTOM.js
| Event   : N/A
|
| Usage   : Custom Script Include.  Insert custom EMSE Function below and they will be 
|	    available to all master scripts
|
| Notes   :
|
/------------------------------------------------------------------------------------------------------*/

function loadScript(scriptName) {
    scriptName = scriptName.toUpperCase();
    var emse = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var script = emse.getScriptByPK(aa.getServiceProviderCode(), scriptName, "ADMIN");
    return script.getScriptText() + "";
}

eval(loadScript("INCLUDES_DPR_BOOT"));
Dpr.fireAction();

function fireDprAction(capId, event, task, status) {
    // store current event and user
    if (event) {
        var eventName = aa.env.getValue("EventName") + "";
        var user = aa.env.getValue("CurrentUserID") + "";
        var id1 = aa.env.getValue("PermitId1");
        var id2 = aa.env.getValue("PermitId2");
        var id3 = aa.env.getValue("PermitId3");

        // set the event as wtua and user as the dpr admin user
        aa.env.setValue("EventName", event);
        aa.env.setValue("CurrentUserID", Dpr.getAdminUser());
        if (capId) {
            aa.env.setValue("PermitId1", capId.getID1());
            aa.env.setValue("PermitId2", capId.getID2());
            aa.env.setValue("PermitId3", capId.getID3());
        }

        // fire the action
        Dpr.load();
        if (event === "WorkflowTaskUpdateAfter") {
            Dpr.fireAction({
                taskName: task,
                taskStatus: status
            });
        } else {
            Dpr.fireAction();
        }

        // set environment variables back to original values
        aa.env.setValue("EventName", eventName);
        aa.env.setValue("CurrentUserID", user);

        if (capId) {
            aa.env.setValue("PermitId1", id1);
            aa.env.setValue("PermitId2", id2);
            aa.env.setValue("PermitId3", id3);
        }
    }
}

function fireDprWorkflowActions(capId, taskName, taskStatus) {
    if (Dpr && Dpr.isProject(capId)) {
        Dpr.load();
        if (Dpr.projectExists(Dpr.getAdminUser(), capId)) {
            fireDprAction(capId, "WorkflowTaskUpdateAfter", taskName + "", taskStatus + "");
        }
    }
}

function closeTask(wfstr, wfstat, wfcomment, wfnote) // optional process name
{
    var useProcess = false;
    var processName = "";
    if (arguments.length == 5) {
        processName = arguments[4]; // subprocess
        useProcess = true;
    }

    var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
    if (workflowResult.getSuccess())
        var wfObj = workflowResult.getOutput();
    else { logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage()); return false; }

    if (!wfstat) wfstat = "NA";

    for (i in wfObj) {
        var fTask = wfObj[i];
        if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
            var dispositionDate = aa.date.getCurrentDate();
            var stepnumber = fTask.getStepNumber();
            var processID = fTask.getProcessID();

            if (useProcess)
                aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "Y");
            else
                aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "Y");

            // Trigger actions in DPR for task statuses updated via script
            fireDprWorkflowActions(capId, wfstr, wfstat);

            logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat);
            logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat);
        }
    }
}

function updateTask(wfstr, wfstat, wfcomment, wfnote) // optional process name, cap id
{
    var useProcess = false;
    var processName = "";
    if (arguments.length > 4) {
        if (arguments[4] != "") {
            processName = arguments[4]; // subprocess
            useProcess = true;
        }
    }
    var itemCap = capId;
    if (arguments.length == 6)
        itemCap = arguments[5]; // use cap ID specified in args

    var workflowResult = aa.workflow.getTaskItems(itemCap, wfstr, processName, null, null, null);
    if (workflowResult.getSuccess())
        var wfObj = workflowResult.getOutput();
    else {
        logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
        return false;
    }

    if (!wfstat)
        wfstat = "NA";

    for (i in wfObj) {
        var fTask = wfObj[i];
        if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
            var dispositionDate = aa.date.getCurrentDate();
            var stepnumber = fTask.getStepNumber();
            var processID = fTask.getProcessID();
            if (useProcess)
                aa.workflow.handleDisposition(itemCap, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "U");
            else
                aa.workflow.handleDisposition(itemCap, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "U");

            // Trigger actions in DPR for task statuses updated via script
            fireDprWorkflowActions(itemCap, wfstr, wfstat);

            logMessage("Updating Workflow Task " + wfstr + " with status " + wfstat);
            logDebug("Updating Workflow Task " + wfstr + " with status " + wfstat);
        }
    }
}

function branchTask(wfstr, wfstat, wfcomment, wfnote) // optional process name
{
    var useProcess = false;
    var processName = "";
    if (arguments.length == 5) {
        processName = arguments[4]; // subprocess
        useProcess = true;
    }

    var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
    if (workflowResult.getSuccess())
        var wfObj = workflowResult.getOutput();
    else { logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage()); return false; }

    if (!wfstat) wfstat = "NA";

    for (i in wfObj) {
        var fTask = wfObj[i];
        if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
            var dispositionDate = aa.date.getCurrentDate();
            var stepnumber = fTask.getStepNumber();
            var processID = fTask.getProcessID();

            if (useProcess)
                aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "B");
            else
                aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "B");

            // Trigger actions in DPR for task statuses updated via script
            fireDprWorkflowActions(capId, wfstr, wfstat);

            logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Branching...");
            logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Branching...");
        }
    }
}

function loopTask(wfstr, wfstat, wfcomment, wfnote) // optional process name
{
    var useProcess = false;
    var processName = "";
    if (arguments.length == 5) {
        processName = arguments[4]; // subprocess
        useProcess = true;
    }

    var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
    if (workflowResult.getSuccess())
        var wfObj = workflowResult.getOutput();
    else {
        logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
        return false;
    }

    if (!wfstat)
        wfstat = "NA";

    for (i in wfObj) {
        var fTask = wfObj[i];
        if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
            var dispositionDate = aa.date.getCurrentDate();
            var stepnumber = fTask.getStepNumber();
            var processID = fTask.getProcessID();

            if (useProcess)
                aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "L");
            else
                aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "L");

            // Trigger actions in DPR for task statuses updated via script
            fireDprWorkflowActions(capId, wfstr, wfstat);

            logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
            logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
        }
    }
}

/**
 * results workflow task and sets the status and performs next step based on configured status
 * @param wfstr
 * @param wfstat
 * @param wfcomment
 * @param wfnote
 * @returns {Boolean}
 */
function resultWorkflowTask(wfstr, wfstat, wfcomment, wfnote) // optional process name
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 5) {
		processName = arguments[4]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
		return false;
	}

	if (!wfstat)
		wfstat = "NA";

	for (i in wfObj) {
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
			var statObj = aa.workflow.getTaskStatus(fTask, wfstat);
			var dispo = "U";
			if (statObj.getSuccess()) {
				var status = statObj.getOutput();
				dispo = status.getResultAction();
			} else {
				logDebug("Could not get status action resulting to no change")
			}

			var dispositionDate = aa.date.getCurrentDate();
			var stepnumber = fTask.getStepNumber();
			var processID = fTask.getProcessID();

			if (useProcess)
				aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, dispo);
			else
				aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, dispo);

            // Trigger actions in DPR for task statuses updated via script
            fireDprWorkflowActions(capId, wfstr, wfstat);

			logMessage("Resulting Workflow Task: " + wfstr + " with status " + wfstat);
			logDebug("Resulting Workflow Task: " + wfstr + " with status " + wfstat);
		}
	}
} 
/**
 * Notification should have 
 *  $$TOPHONE$$ for SMS Template To
 *  $$TOEMAIL$$ for Email Template To
 *  $$CCEMAIL$$ for Email Tempalte CC
 *  From value in template needs to be a properly set account to have sent.
 * @param {string} templateName | communicaiton template name
 * @param {hashtable} parameters | aa.util.newHashtable(), add replacement parameters
 * @param {string} toSmsPhone | "" or 15554443333 for phone number
 * @param {string} toEmail | "" or email address
 * @param {string} ccEmail | "" or email address
 * @param {string} eventName | event name to show in communication manager to make tracing easier
 */
function gqSendCommunication(templateName, parameters, toSmsPhone, toEmail,ccEmail, eventName) {
    if (eventName == null || eventName == "") {
        eventName = "gqSendCommunication";
    }
    parameters.put("$$TOPHONE$$", toSmsPhone);
    parameters.put("$$TOEMAIL$$", toEmail);
    parameters.put("$$CCEMAIL$$", ccEmail);
    var comm = aa.communication.sendMessages(templateName, parameters, eventName);
    logDebug("Send = " + comm.getSuccess());
}

