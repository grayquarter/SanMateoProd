var myCapId = "BLD22-00042";
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

/* master script code don't touch */ aa.env.setValue("EventName", eventName); var vEventName = eventName; var controlString = eventName; var tmpID = aa.cap.getCapID(myCapId).getOutput(); if (tmpID != null) { aa.env.setValue("PermitId1", tmpID.getID1()); aa.env.setValue("PermitId2", tmpID.getID2()); aa.env.setValue("PermitId3", tmpID.getID3()); } aa.env.setValue("CurrentUserID", myUserId); var preExecute = "PreExecuteForAfterEvents"; var documentOnly = false; var SCRIPT_VERSION = 3.0; var useSA = false; var SA = null; var SAScript = null; var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { useSA = true; SA = bzr.getOutput().getDescription(); bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT"); if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); } } if (SA) { eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript, SA, useProductScript)); } else { eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductScript)); } eval(getScriptText("INCLUDES_CUSTOM", null, useProductInclude)); if (documentOnly) { doStandardChoiceActions2(controlString, false, 0); aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed."); aa.abortScript(); } var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName); var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS"; var doStdChoices = true; var doScripts = false; var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0; if (bzr) { var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE"); doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT"); doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; } function getScriptText(vScriptName, servProvCode, useProductScripts) { if (!servProvCode) servProvCode = aa.getServiceProviderCode(); vScriptName = vScriptName.toUpperCase(); var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput(); try { if (useProductScripts) { var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName); } else { var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN"); } return emseScript.getScriptText() + ""; } catch (err) { return ""; } } logGlobals(AInfo); if (runEvent && typeof (doStandardChoiceActions) == "function" && doStdChoices) try { doStandardChoiceActions(controlString, true, 0); } catch (err) { logDebug(err.message) } if (runEvent && typeof (doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g, "\r"); aa.print(z);
logDebug("---RUNNING TEST CODE")
//
// User code goes here
//
// Change the date!
var requestedDate = "01/24/2025";
var clearOtherInspections = true;

var sampleData = [
   {
        "capId": "RES-ADD-24-000001",
        "inspType": "Footing and Foundation",
        "time2": "AM",
        "phone": "555-481-1213"
    }, {
        "capId": "RES-ADD-24-000001",
        "inspType": "Slab Inspection",
        "time2": "AM",
        "phone": "555-481-1213"
    }, {
        "capId": "RES-ELC-24-000001",
        "inspType": "Electrical Final Inspection",
        "time2": "AM"
    }, {
        "capId": "RES-NEW-24-000001",
        "inspType": "Framing Inspection",
        "time2": "AM",
        "phone": "555-867-5309"
    }, {
        "capId": "RES-NEW-24-000001",
        "inspType": "Electrical Rough-In Inspection",
        "comment": "Breaker box is behind the house by the shed.",
        "phone": "555-756-9146",
    }, {
        "capId": "RES-NEW-24-000002",
        "inspType": "Dry Wall Inspection",
        "time2": "AM",
        "comment": "Will not be home during inspection. "
    }, {
        "capId": "RES-ALT-24-000002",
        "inspType": "Slab Inspection",
        "time1": "09:00",
        "time2": "AM",
        "phone": "555-657-4523"
    }, {
        "capId": "RES-ALT-24-000003",
        "inspType": "Framing Inspection",
        "time2": "AM",
        "comment": "Big dog in back yard."
    }, {
        "capId": "RES-ALT-24-000004",
        "inspType": "Insulation Inspection",
    }, {
        "capId": "RES-ALT-24-000005",
        "inspType": "Progress Check",
        "time2": "PM",
        "comment": "Call on arrival.",
        "phone": "555-980-7529"
    }, {
        "capId": "COM-ELC-24-000001",
        "inspType": "Electrical Final Inspection",
        "time2": "AM",
        "phone": "555-481-1413"
    }, {
        "capId": "COM-PLS-24-000001",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM"
    }, {
        "capId": "RES-SOLAR-24-000001",
        "inspType": "Solar/PV Final Inspection",
        "time2": "AM",
        "phone": "555-481-1413",
        "comment": "Moved two solar panels to south side of roof"
    }, {
        "capId": "RES-ROOF-24-000001",
        "inspType": "Roofing Final Inspection",
        "time2": "AM",
        "phone": "555-481-1111",
        "comment": "We need a morning inspection"
    }, {
        "capId": "RES-ROOF-24-000002",
        "inspType": "Roofing Final Inspection",
        "time2": "PM",
        "phone": "555-481-2222",
        "comment": "We need an afternoon inspection"
    }, {
        "capId": "RES-ROOF-24-000003",
        "inspType": "Roofing Final Inspection",
        "time2": "PM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000001",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000002",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-3453",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000003",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-9999",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000004",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-8787",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000005",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-8888",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-PLM-24-000006",
        "inspType": "Plumbing Final Inspection",
        "time2": "PM",
        "phone": "555-481-7777",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000003",
        "inspType": "Dry Wall Inspection",
        "time2": "PM",
        "comment": "Will not be home during inspection. "
    }, {
        "capId": "RES-ALT-24-000006",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "comment": "Will not be home during inspection. "
    }, {
        "capId": "RES-ROOF-24-000004",
        "inspType": "Roofing Final Inspection",
        "time2": "AM",
        "phone": "555-481-3331",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-ROOF-24-000005",
        "inspType": "Roofing Final Inspection",
        "time2": "PM",
        "phone": "555-481-3332",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-ROOF-24-000006",
        "inspType": "Roofing Final Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-ROOF-24-000007",
        "inspType": "Roofing Final Inspection",
        "time2": "PM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-ROOF-24-000008",
        "inspType": "Roofing Final Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000006",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000015",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000014",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000013",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000006",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000015",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000014",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000013",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000006",
        "inspType": "DElectrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000015",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000014",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000013",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000008",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000010",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000011",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000012",
        "inspType": "Drywall Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000008",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000010",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000011",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000012",
        "inspType": "Insulation Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000008",
        "inspType": "DElectrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
    , {
        "capId": "RES-NEW-24-000010",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000011",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }, {
        "capId": "RES-NEW-24-000012",
        "inspType": "Electrical Rough-In Inspection",
        "time2": "AM",
        "phone": "555-481-3333",
        "comment": "Call before arriving"
    }
]

try {

    for (i in sampleData) {
        // Get a map from the sampleData array
        var recordMap = sampleData[i];
        var capId = aa.cap.getCapID(recordMap["capId"])
        if (!capId.getSuccess()) {
            logDebug("Error getting capId: " + capId.getErrorMessage());
            continue;
        }
        capId = capId.getOutput();
        // Schedule the inspection

		if (clearOtherInspections) {
			//AD Clear Existing Inspections
			var inspections = aa.inspection.getInspections(capId).getOutput();
			//find the matching inspection
			for (var i in inspections)
			{
				var inspId = inspections[i].getIdNumber()
				deleteInspection(inspId);
			}
		}


        var inspectionId = scheduleInspection1(capId, recordMap, requestedDate);
        if (!inspectionId) {
            continue;
        }
        // Get inspection info
        var inspectionModel = aa.inspection.getInspection(capId, inspectionId);
        if (!inspectionModel.getSuccess) {
            logDebug("Error re-retrieving inspection: " + inspectionModel.getErrorMessage());
        }
        inspectionModel = inspectionModel.getOutput();
        var inspection = inspectionModel.getInspection();
        var activity = inspection.activity;

        // Set phone number
        activity.setReqPhoneNum(!!recordMap["phone"] ? recordMap["phone"] : "");

        // Set requested time
        if (!!recordMap["time1"]) {
            activity.setDesiredTime2(recordMap["time1"])
        }

        // Set requested AM/PM
        activity.setDesiredTime(recordMap["time2"]);



        // Push the modified inspection.
        editResult = aa.inspection.editInspection(inspectionModel);
        if (!editResult.getSuccess()) {
            logDebug("Error editing the inspection: " + editResult.getErrorMessage());
        }
        logDebug("Updated inspection with desired data.");

        // Set autoAssign
        if (!!recordMap["inspector"]) {
            assignInspection(inspectionId, recordMap["inspector"]);
        }
    }
}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug)

//Custom Functions
function scheduleInspection1(paramCap, recordMap, requestedDate) {
    comment = (!!recordMap["comment"] ? recordMap["comment"] : "")
    inspectionResult = aa.inspection.scheduleInspection(
        paramCap,
        null,
        aa.date.parseDate(requestedDate),
        null,
        recordMap["inspType"],
        comment);

    if (!inspectionResult.getSuccess()) {
        logDebug("Error with inspection: " + result.getErrorMessage());
        return null;
    }
    logDebug("Scheduled inspection for capId: " + recordMap["capId"]);
    inspectionId = inspectionResult.getOutput();
    return inspectionId;
}


function deleteInspection(inspId)
{
	var itemCap = capId;
	//dont do this at home
	var aDAO = new com.accela.aa.inspection.inspection.ActivityDAOOracle();
	if (arguments.length > 1) itemCap = arguments[1];


	var insp = aa.inspection.getInspection(itemCap, inspId).getOutput();
	if (!insp) return false;
	var act = insp.getInspection().getActivity();

	//delete inspection
	aDAO.removeActivity(act);

	return true;
}

function getCap(paramCap) {
    // Get the CapModel from the capId
    cap = aa.cap.getCap(paramCap);
    if (!cap.getSuccess()) {
        logDebug("Error getting cap: " + cap.getErrorMessage());
        return null
    }
    cap = cap.getOutput();
    return cap;
}

//Utility Functions
function explore(objExplore) {
    logDebug("Methods:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) == "function") {
            logDebug("<font color=blue><u><b>" + x + "</b></u></font> ");
            logDebug("   " + objExplore[x] + "<br>");
        }
    }
    logDebug("");
    logDebug("Properties:")
    for (x in objExplore) {
        if (typeof(objExplore[x]) != "function") logDebug("  <b> " + x + ": </b> " + objExplore[x]);
    }
}
