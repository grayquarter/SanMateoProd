var myCapId = "$$ALTID$$";
//var myCapId = "24TMP-000594";
var myUserId = "ADMIN";
var eventName = "";

/* TEST  */  var eventName = "SCRIPT_TEST";
/* CTRCA */  var eventName = "ConvertToRealCapAfter";
/* ASA   */  var eventName = "ApplicationSubmitAfter";
/* ASIUA */  //var eventName = "ApplicationSubmitAfter";
/* WTUA  */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "License Issuance"; wfProcess = "XX"; wfComment = "XX";  wfStatus = "Issued";  wfDateMMDDYYYY = "01/27/2015";
/* IRSA  */  //var eventName = "InspectionResultSubmitAfter"; inspId=0;  inspType="Roofing"; inspResult="Failed"; inspResultComment = "Comment"; 
/* ISA   */  //var eventName = "InspectionScheduleAfter"; inspType = "Roofing";
/* PRA   */  //var eventName = "PaymentReceiveAfter";

var useProductInclude = true; //  set to true to use the "productized" include file (events->custom script), false to use scripts from (events->scripts)
var useProductScript = true;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.

/* master script code don't touch */ aa.env.setValue("EventName", eventName); var vEventName = eventName; var controlString = eventName; var tmpID = aa.cap.getCapID(myCapId).getOutput(); if (tmpID != null) {aa.env.setValue("PermitId1", tmpID.getID1()); aa.env.setValue("PermitId2", tmpID.getID2()); aa.env.setValue("PermitId3", tmpID.getID3());} aa.env.setValue("CurrentUserID", myUserId); var preExecute = "PreExecuteForAfterEvents"; var documentOnly = false; var SCRIPT_VERSION = 3.0; var useSA = false; var SA = null; var SAScript = null; var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {useSA = true; SA = bzr.getOutput().getDescription(); bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT"); if (bzr.getSuccess()) {SAScript = bzr.getOutput().getDescription();} } if (SA) {eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript, SA, useProductScript));} else {eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductScript));} eval(getScriptText("INCLUDES_CUSTOM", null, useProductInclude)); if (documentOnly) {doStandardChoiceActions2(controlString, false, 0); aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed."); aa.abortScript();} var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName); var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS"; var doStdChoices = true; var doScripts = false; var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0; if (bzr) {var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE"); doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT"); doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";} function getScriptText(vScriptName, servProvCode, useProductScripts) {if (!servProvCode) servProvCode = aa.getServiceProviderCode(); vScriptName = vScriptName.toUpperCase(); var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput(); try {if (useProductScripts) {var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);} else {var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");} return emseScript.getScriptText() + "";} catch (err) {return "";} } logGlobals(AInfo); if (runEvent && typeof (doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString, true, 0);} catch (err) {logDebug(err.message)} if (runEvent && typeof (doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g, "\r"); aa.print(z);
logDebug("---RUNNING TEST CODE")
//
// User code goes here
//

try {

    var fees = [];
    // Get Event Fees
    doEventsLocal(["ApplicationSubmitAfter"])
    var eventFees = aa.finance.getFeeItemByCapID(capId).getOutput();
    for (var i in eventFees) {
        logDebug("HAVE FEES!")
        //exploreObject(eventFees[i])
        var result = getFeeDetailsFromF4M(eventFees[i]);
        result.source = "Event";
        fees.push(result);
        logDebug("PUSHED: " + result);

    }

    // Get configured fees
    var res = aa.finance.getFeeScheduleByCapID(capId).getOutput();
    var feeItems = aa.finance.getFeeItemList(capId, res, null).getOutput();
    for (var i in feeItems) {
        var feeName = feeItems[i].feeDes;
        var feeItemModel = feeItems[i].getrFreeItem();
        var feeCode = feeItems[i].feeCod;
        var feeSchedule = feeItems[i].feeSchedule;
        var qtyIndicator = feeItemModel.qtyIndicator;
        var feeQuantity = feeItemModel.quantity ? feeItemModel.quantity : 0;
        var autoInvoiced = feeItemModel.autoInvoicedFlag == "Y";
        var autoAssessed = feeItemModel.autoAssessFlag == "Y";
        // logDebug("Fee Code: " + feeCode + " Fee Schedule: " + feeSchedule + " Fee Quantity: " + feeQuantity + " Auto Invoiced: " + autoInvoiced + " Auto Assessed: " + autoAssessed);
        if (autoAssessed && autoInvoiced) {
            if (qtyIndicator) {
                // WRONG?
                feeQuantity = getQtyFromIndicator(qtyIndicator) || feeQuantity;
            }
            var feeBusiness = aa.proxyInvoker.newInstance("com.accela.aa.finance.fee.FeeBusiness").getOutput();
            var F4M = aa.fee.createF4FeeItemScriptModel().f4FeeItem
            F4M.setCapID(capId);
            F4M.setFeeCod(feeCode);
            F4M.feeCalcProc = feeItemModel.calProc;
            F4M.feeSchudle = feeItemModel.feeSchedule;
            F4M.formula = feeItemModel.formula;
            F4M.paymentPeriod = feeItemModel.paymentPeriod;
            F4M.auditID = "ADMIN";
            F4M.feeUnit = feeQuantity;
            var feeSeq = feeBusiness.createPosTransFeeItem(F4M, "ADMIN"); // try using editPosTransFeeItem
            var result = getFeeDetailsFromF4M(F4M);
            result.source = "Configuration";
            fees.push(result);
        }
    }

    // for (var i in fees) {
    //     logDebug(JSON.stringify(fees[i], null, 2));
    // }
    aa.env.setValue("gq_fees", JSON.stringify(fees));
} catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug)

//Custom Functions
function getFeeDetailsFromF4M(f4m) {
    var fee = {};
    fee.schedule = String(f4m.feeSchudle);
    fee.code = String(f4m.feeCod);
    fee.paymentPeriod = String(f4m.paymentPeriod);
    fee.due = String(f4m.fee);
    fee.sequence = String(f4m.feeSeqNbr);
    fee.quantity = String(f4m.feeUnit);
    var feeConfig = aa.fee.getRefFeeItemByFeeCode(fee.schedule, fee.code, null, aa.date.getCurrentDate()).getOutput();
    if(feeConfig){
      fee.name = String(feeConfig.feeDes);
      fee.description = String(feeConfig.comments);
    }
    return fee;
}
function getQtyFromIndicator(indicator) {
    var asi = aa.appSpecificInfo.getByCapID(capId).getOutput();
    for (var i in asi) {
        var asiFeeIndicator = asi[i].feeIndicator;
        if (asiFeeIndicator == indicator) {
            var value = asi[i].checklistComment;
            return parseFloat(value);
        }
    }
}

function doEventsLocal(events) {
    var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.
    publicUser = true;

    var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
    var doStdChoices = true;
    var doScripts = false;
    var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
    if (bzr) {
        var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
        doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
        var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
        doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
    }

    logGlobals(AInfo);

    for (var e in events) {
        var eventName = events[e];
        prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", eventName);
        logDebug("prefix: " + prefix);
        aa.env.setValue("EventName", eventName);
        var vEventName = eventName;
        var controlString = eventName;
        if (runEvent && typeof (doStandardChoiceActions) == "function" && doStdChoices)
            try {
                doStandardChoiceActions(controlString, true, 0);
            } catch (err) {
                logDebug(err.message)
            }
        if (runEvent && typeof (doScriptActions) == "function" && doScripts) {
            doScriptActions();
        }
    }
}


/**
 * @namespace Accela
 * @function exploreObject
 * @description prints the methods and properities of an Object passed in to the funcion
 * @param {object} pamaremeters
 * @param {string | number} key
 * @param {string | number} value
 */
function exploreObject (objExplore) {

	logDebug("Methods:")
	for (x in objExplore) {
		if (typeof(objExplore[x]) == "function") {
			logDebug("<font color=blue><u><b>" + x + "</b></u></font> ");
			logDebug("   " + objExplore[x] + "<br>");
		}
	}

	logDebug("");
	logDebug("Properties:");
	for (x in objExplore) {
		if (typeof(objExplore[x]) != "function") logDebug("  <b> " + x + ": </b> " + objExplore[x]);
	}

}
