/*------------------------------------------------------------------------------------------------------/
| Program : ACA_LIC_GN2_RF_AFTER_ADDLICTOTABLE.js
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
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS",null,true));
eval(getScriptText("INCLUDES_CUSTOM",null,true));
var cap = aa.env.getValue("CapModel"); //class com.accela.aa.aamain.cap.CapModel
var capId = cap.getCapID();
var parentCapId = getParent(capId);
var capIDString = capId.getCustomID();
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString();
var appTypeArray = appTypeString.split("/");
var servProvCode = capId.getServiceProviderCode()       		// Service Provider Code
var publicUser = true ;
var currentUserID = aa.env.getValue("CurrentUserID");
var sysDate = aa.date.getCurrentDate();
var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"");
var asiGroups = cap.getAppSpecificInfoGroups();
var asit =  cap.getAppSpecificTableGroupModel();
var contactArray = cap.getContactsGroup().toArray();
var cancel = false;
var thisCap = aa.cap.getCap(capId).getOutput();
var thisCapModel = thisCap.getCapModel();
loadASITables4ACA();


try{
    useAppSpecificGroupName = true;
    var appSpecificTableGroupModel = cap.getAppSpecificTableGroupModel();
    var table = new Array();
    var vTableName = "LICENSES APPLIED FOR";
    
    // Change of Ownership Amendment
    if(matches(getAppSpecific4ACA("PURCHASE INFORMATION.Purchased Business"),"Yes","YES","Y") && parseFloat(getAppSpecific4ACA("PURCHASE INFORMATION.Percent Purchased")) < 100) {
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/Amendment/Change of Ownership/NA", "Y");
        table.push(row);
    }
    // Education
    if(getAppSpecific4ACA("GENERAL QUESTIONS.General EDU Question") == "CHECKED"){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/General/Education/Application", "Y");
        table.push(row);
    }
    if(matches(getAppSpecific4ACA("AGRICULTURE.Q01"),"YES","Yes","Y") && matches(getAppSpecific4ACA("AGRICULTURE.Q02"),"YES","Yes","Y") && matches(getAppSpecific4ACA("AGRICULTURE.Q03"),"NO","No","N")){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/General/Education/Application", "Y");
        table.push(row);
    }
    // Agriculture
    if(getAppSpecific4ACA("GENERAL QUESTIONS.General AGR Question") == "CHECKED"){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/General/Agriculture/Application", "Y");
        table.push(row);
    }
    // Transportation
    if(getAppSpecific4ACA("GENERAL QUESTIONS.General TRN Question") == "CHECKED"){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/General/Transportation and Warehousing/Application", "Y");
        table.push(row);
    }
    // Liquor related
    if(matches(getAppSpecific4ACA("TRN EXCURSION BOAT LICENSE.Will liquor be sold"),"Yes","YES","Y") && matches(getAppSpecific4ACA("TRN EXCURSION BOAT LICENSE.Do you have a County Liquor Wholesaler Importer License"),"No","NO","N")){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/Restricted/Liquor Wholesaler Importer License/Application", "Y");
        table.push(row);
    }
    // Amusement Machine 
    if(matches(getAppSpecific4ACA("TRN EXCURSION BOAT LICENSE.Will amusement machines be included"),"Yes","YES","Y") && matches(getAppSpecific4ACA("TRN EXCURSION BOAT LICENSE.Do you have a County Amusement Machine License"),"No","NO","N")){
        row = new Array();
        row["License Type"] = new asiTableValObj("License Type", "Licenses/General/Amusement License/Application", "Y");
        table.push(row);
    }


    removeASITable4ACA(appSpecificTableGroupModel, vTableName);
    addASITable4ACAPageFlow(appSpecificTableGroupModel,vTableName, table, capId);
    removeASITable(vTableName);
    addASITable(vTableName, table);

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
function matches(eVal, argList) {
    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i] == eVal) {
            return true;
        }
    }
    return false;
}
function removeASITable4ACA(destinationTableGroupModel, tableName) // optional capId
{
    var ta = destinationTableGroupModel.getTablesMap().values();
    var tai = ta.iterator();
    while (tai.hasNext()) {
        var tsm = tai.next(); // com.accela.aa.aamain.appspectable.AppSpecificTableModel
        if (tableName.equals(tsm.getTableName()))
        {
            var fld = aa.util.newArrayList();
            tsm.setTableFields(fld);
            return true;
        }
    }
    return false;
}
function getAppSpecific4ACA(itemName) {
    var itemValue = null;
    if (useAppSpecificGroupName) {
        if (itemName.indexOf(".") < 0) { logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true"); return false }
    }

    var i = cap.getAppSpecificInfoGroups().iterator();
    while (i.hasNext()) {
        var group = i.next();
        var fields = group.getFields();
        if (fields != null) {
            var iteFields = fields.iterator();
            while (iteFields.hasNext()) {
                var field = iteFields.next();
                if ((useAppSpecificGroupName && itemName.equals(field.getCheckboxType() + "." +
                    field.getCheckboxDesc())) || itemName.equals(field.getCheckboxDesc())) {
                    return field.getChecklistComment();
                }
            }
        }
    }
    return itemValue;
}


function addASITable4ACAPageFlow(destinationTableGroupModel, tableName, tableValueArray) // optional capId
{
    //  tableName is the name of the ASI table
    //  tableValueArray is an array of associative array values.  All elements MUST be either a string or asiTableVal object
    //

    var itemCap = capId
    if (arguments.length > 3)
        itemCap = arguments[3]; // use cap ID specified in args

    var ta = destinationTableGroupModel.getTablesMap().values();
    var tai = ta.iterator();

    var found = false;
    while (tai.hasNext()) {
        var tsm = tai.next(); // com.accela.aa.aamain.appspectable.AppSpecificTableModel
        if (tsm.getTableName().equals(tableName)) {
            found = true;
            break;
        }
    }

    if (!found) {
        logDebug("cannot update asit for ACA, no matching table name");
        return false;
    }

    var i = -1; // row index counter
    if (tsm.getTableFields() != null) {
        i = 0 - tsm.getTableFields().size()
    }

    for (thisrow in tableValueArray) {
        var fld = aa.util.newArrayList(); // had to do this since it was coming up null.
        var fld_readonly = aa.util.newArrayList(); // had to do this since it was coming up null.
        var col = tsm.getColumns()
        var coli = col.iterator();
        while (coli.hasNext()) {
            var colname = coli.next();

            if (typeof(tableValueArray[thisrow][colname.getColumnName()].fieldValue) != "undefined") // we are passed an asiTablVal Obj
            {
                var args = new Array(tableValueArray[thisrow][colname.getColumnName()].fieldValue ? tableValueArray[thisrow][colname.getColumnName()].fieldValue : "", colname);
                var fldToAdd = aa.proxyInvoker.newInstance("com.accela.aa.aamain.appspectable.AppSpecificTableField", args).getOutput();
                fldToAdd.setRowIndex(i);
                fldToAdd.setFieldLabel(colname.getColumnName());
                fldToAdd.setFieldGroup(tableName.replace(/ /g, "\+"));
                fldToAdd.setReadOnly(tableValueArray[thisrow][colname.getColumnName()].readOnly.equals("Y"));
                fld.add(fldToAdd);
                fld_readonly.add(tableValueArray[thisrow][colname.getColumnName()].readOnly);

            } else // we are passed a string
            {
                var args = new Array(tableValueArray[thisrow][colname.getColumnName()] ? tableValueArray[thisrow][colname.getColumnName()] : "", colname);
                var fldToAdd = aa.proxyInvoker.newInstance("com.accela.aa.aamain.appspectable.AppSpecificTableField", args).getOutput();
                fldToAdd.setRowIndex(i);
                fldToAdd.setFieldLabel(colname.getColumnName());
                fldToAdd.setFieldGroup(tableName.replace(/ /g, "\+"));
                fldToAdd.setReadOnly(false);
                fld.add(fldToAdd);
                fld_readonly.add("N");

            }
        }

        i--;

        if (tsm.getTableFields() == null) {
            tsm.setTableFields(fld);
        } else {
            tsm.getTableFields().addAll(fld);
        }

        if (tsm.getReadonlyField() == null) {
            tsm.setReadonlyField(fld_readonly); // set readonly field
        } else {
            tsm.getReadonlyField().addAll(fld_readonly);
        }
    }

    tssm = tsm;
    return destinationTableGroupModel;
}
function valueExistInASIT(customListName,keySetArray,vCapId){
    var tableArr = loadASITable(customListName, vCapId);
    var matchResult = 0;
    var numKeySets = 0;
    for(x in keySetArray){
        numKeySets++
        strKey = keySetArray[x][0];
        strValue = keySetArray[x][1];
        for (r in tableArr) {
            if(tableArr[r][strKey] == strValue) {
                matchResult++
            }
        }
    }
    if(matchResult == numKeySets){
        return true;
    }else{
        return false;
    }
}

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