/*------------------------------------------------------------------------------------------------------/
| Program : ACA_LIC_GN2_RF_ONLOAD_ADM.js
| Event   : ACA OnLoad Event
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;						// Set to true to see results in popup window
var showDebug = false;							// Set to true to see debug messages in popup window
var useAppSpecificGroupName = false;			// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;			// Use Group name when populating Task Specific Info Values
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var message =	"";							// Message String
var debug = "";								// Debug String
var br = "<BR>";							// Break Tag
var useProductScripts = true;
function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode)  servProvCode = aa.getServiceProviderCode();
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

var cap = aa.env.getValue("CapModel"); //class com.accela.aa.aamain.cap.CapModel
var capId = cap.getCapID();
var capIDString = capId.getCustomID();
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString();
var appTypeArray = appTypeString.split("/");
var servProvCode = capId.getServiceProviderCode()       		// Service Provider Code
var publicUser = true ;
var currentUserID = aa.env.getValue("CurrentUserID");
var asiGroups = cap.getAppSpecificInfoGroups();
var asit =  cap.getAppSpecificTableGroupModel();
var contactArray = cap.getContactsGroup().toArray();
var cancel = false;
var thisCap = aa.cap.getCap(capId).getOutput();
var thisCapModel = thisCap.getCapModel();
try{
    var q1 = getFieldValue("General ADM Question", asiGroups);
    if(q1 != "CHECKED"){
        aa.env.setValue("ReturnData", "{'PageFlow': {'HidePage' : 'Y'}}");
    }
}catch (error){
    cancel = true;
    showDebug = true;
    comment(error.message);
}
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/
if (debug.indexOf("**ERROR") > 0)
{
    aa.env.setValue("ErrorCode", "1");
    aa.env.setValue("ErrorMessage", debug);
}
else
{
    if (cancel)
    {
        aa.env.setValue("ErrorCode", "-2");
        if (showMessage) aa.env.setValue("ErrorMessage", message);
        if (showDebug) 	aa.env.setValue("ErrorMessage", debug);
    }
    else
    {
        aa.env.setValue("ErrorCode", "0");
        if (showMessage) aa.env.setValue("ErrorMessage", message);
        if (showDebug) 	aa.env.setValue("ErrorMessage", debug);
    }
}
/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/--------------------------------------------------------------------------------------------------*/
function getFieldValue(fieldName, asiGroups)
{
    if(asiGroups == null)
    {
        return null;
    }
    var iteGroups = asiGroups.iterator();
    while (iteGroups.hasNext())
    {
        var group = iteGroups.next();
        var fields = group.getFields();
        if (fields != null)
        {
            var iteFields = fields.iterator();
            while (iteFields.hasNext())
            {
                var field = iteFields.next();
                if (fieldName == field.getCheckboxDesc())
                {
                    return field.getChecklistComment();
                }
            }
        }
    }
    return null;
}