/*  kelly jaramillo 8-13-24.   This script will run the query the db for permits from Code enforcement.  This is for ticket https://grayquarter.zendesk.com/agent/tickets/4486
*/


//#region Load Environment
var SCRIPT_VERSION = "3.0";
var BATCH_NAME = "BATCH_UPDATE_INSP_STATUS";
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, true));
var currentUserID = "ADMIN";
aa.env.setValue("BatchJobName", BATCH_NAME);
//#endregion

//#region Batch Parameters

//#endregion

//#region Batch Globals
var showDebug = true; // Set to true to see debug messages
var maxSeconds = 5 * 60; // number of seconds allowed for batch processing,
// usually < 5*60
allowedDays = 0; //temporay declaration
var startDate = new Date();
var timeExpired = false;
var startTime = startDate.getTime(); // Start timer
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = "" + aa.env.getValue("BatchJobName");
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var servProvCode = aa.getServiceProviderCode();
var capId = null;
var altId = "";
var documentOnly = false;

logMessage = function (etype, edesc) {
    aa.print(etype + " : " + edesc);
}
logDebug = function (edesc) {
    if (showDebug) {
        aa.print("DEBUG : " + edesc);
    }
}
//#endregion

//Counters
var updated = 0;


logMessage("START", "Start of Job");
if (!timeExpired) mainProcess();
if (documentOnly) {
    aa.env.setValue("ScriptReturnCode", "0");
    aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
    aa.abortScript();
}
logMessage("END", "End of Job: Elapsed Time : " + elapsed() + " Seconds");

//#region Main
function mainProcess() {
    var recordCap = selectRecords();
    if (recordCap.size() > 0) {
        var rec = recordCap.toArray();
        for (var i in rec) {
            altId = rec[i].get("B1_ALT_ID");
            capId = aa.cap.getCapID(altId).getOutput();

            //KELLY ADD YOUR CODE HERE
            RemoveDocAndPermit()
            updated++;
        }
        logDebug("Updated " + updated + " records");
    }

}

//#endregion
function getParam(pParamName) //gets parameter value and logs message showing param value
{
    var ret = "" + aa.env.getValue(pParamName);
    logDebug("Parameter : " + pParamName + " = " + ret);
    return ret;
}

function _sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile) {
    var itemCap = capId;
    if (arguments.length == 7) itemCap = arguments[6]; // use cap ID specified in args

    var id1 = itemCap.ID1;
    var id2 = itemCap.ID2;
    var id3 = itemCap.ID3;

    var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);

    var result = null;
    result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
    if (result.getSuccess()) {
        //aa.print("Sent email successfully!");
        return true;
    } else {
        aa.print("Failed to send mail. - " + result.getErrorType());
        return false;
    }
}
function elapsed() {
    var thisDate = new Date();
    var thisTime = thisDate.getTime();
    return ((thisTime - startTime) / 1000)
}


function selectRecords() {
    var q = "SELECT B.B1_ALT_ID FROM B1PERMIT B WHERE SERV_PROV_CODE = ? AND B1_MODULE_NAME = 'Enforcement' AND B1_ALT_ID LIKE 'CE%' AND B1_FILE_DD <= DATEADD(year, -5, GETDATE()) GROUP BY B.B1_ALT_ID";
    aa.print(q);
    var recordsResult = aa.db.select(q, [aa.getServiceProviderCode()]);
    var records = null;
    if (!recordsResult.getSuccess()) {
        logDebug("Problem in selectRecords(): " + recordsResult.getErrorMessage());
        return false;
    }
    records = recordsResult.getOutput();
    return records;
}

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

function RemoveDocAndPermit()
{
    /*  kelly jaramillo 8-13-24.   This script will run the query the db for permits from Code enforcement.  This is for ticket https://grayquarter.zendesk.com/agent/tickets/4486
    */

    // var q = "SELECT * FROM B1PERMIT B WHERE SERV_PROV_CODE = ? and B1_ALT_ID IN  ('RES-ADD-24-000002','RES-ADD-24-000003') ";
    var q = "SELECT B.B1_ALT_ID FROM B1PERMIT B WHERE SERV_PROV_CODE = ? AND B1_MODULE_NAME = 'Enforcement' AND B1_ALT_ID LIKE 'CE%' AND B1_FILE_DD <= DATEADD(year, -5, GETDATE()) GROUP BY B.B1_ALT_ID";
    logMessage(q);
    var recordsResult =  aa.db.select(q, [aa.getServiceProviderCode()]);
    var records = null;

    if (!recordsResult.getSuccess()) 
    {
        // Error getting records back
        logMessage("Problem in selectRecords(): " + recordsResult.getErrorMessage());
        logMessage("Problem in selectRecords(): " );

    }
    else 
    {
        var altid = "";

        records = recordsResult.getOutput();
        logMessage("Number of Recordos returnd "+records.size());
        var rec = records.toArray();
        for (var i in rec) 
        {
            altId = rec[i].get("B1_ALT_ID");
            capId = aa.cap.getCapID(altId).getOutput();
            logMessage("altid "+capId);
            var docListResult = aa.document.getCapDocumentList(capId,"ADMIN");
            if (docListResult.getSuccess()) 
            {       
                logMessage("DOC LOOPS")
                var docListArray = docListResult.getOutput();
                for(var idx in docListArray)
                {
    
                    var thisDocModel = docListArray[idx]; // com.accela.aa.ads.ads.DocumentModel
                    var thisDocObj = {};
                    var theDocNumber =  ""+thisDocModel.getDocumentNo();
    
                    try 
                    {
                        var removeDoc = aa.document.removeDocumentByPK(theDocNumber, null, null, null);
                        if (removeDoc.getSuccess()) 
                        {
                            logMessage("Success Removing Doc by ID: "+theDocNumber);
                            aa.cap.removeRecord(capId);
                        } 
                        else 
                        {
                            logMessage("Error Removing Doc by ID ["+theDocNumber+"]  " +removeDoc.getErrorMessage);
                        }
                    } 
                    catch (error) 
                    {
                        logMessage("Critical Error message: " + error);
                        // return false;
                    }
                }
            }    
            else 
            {
                logMessage("Error doclist issue ")
            }
        }

    }


}

//#endregion
logDebug(updated + " Records were updated");