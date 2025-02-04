//ACA_LIC_GN2_RFDBA_ONLOAD_ACA
var showMessage = false;                        // Set to true to see results in popup window
var showDebug = false;                          // Set to true to see debug messages in popup window
var useAppSpecificGroupName = false;            // Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;           // Use Group name when populating Task Specific Info Values
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var message =   "";                         // Message String
var debug = "";                             // Debug String
var br = "<BR>";                            // Break Tag
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
//var parentCapId = getParent(capId);
var capIDString = capId.getCustomID();
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString();
var appTypeArray = appTypeString.split("/");
var servProvCode = capId.getServiceProviderCode()               // Service Provider Code
var publicUser = true ;
var currentUserID = aa.env.getValue("CurrentUserID");
var sysDate = aa.date.getCurrentDate();
var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(),sysDate.getDayOfMonth(),sysDate.getYear(),"");
var asiGroups = cap.getAppSpecificInfoGroups();
var appSpecificTableGroupModel =  cap.getAppSpecificTableGroupModel();
var contactArray = cap.getContactsGroup().toArray();
var cancel = false;
loadASITables4ACA();
try{
    var purchasedYN = getFieldValue("Purchased Business", asiGroups);
    var percentPurchased = parseFloat(getFieldValue("Percent Purchased", asiGroups));
    if(matches(purchasedYN,"Yes","Y","YES") && percentPurchased < 100){
        aa.env.setValue("ReturnData", "{'PageFlow': {'HidePage' : 'Y'}}");
    }

    var addressModel = cap.getAddressModel();
    var thisDBA = getFieldValue("DBA Name", asiGroups);
    var asiTableRows = getRecsByAddressDbaMatch(thisDBA, addressModel, 80);

    removeASITable4ACA(appSpecificTableGroupModel, "EXISTING DBA AT ADDRESS");
    addASITable4ACAPageFlow(appSpecificTableGroupModel, "EXISTING DBA AT ADDRESS", asiTableRows, capId);
}
catch (error)
{
    cancel = true;
    showDebug = true;
    comment(error.message+ " Line " + error.lineNumber+" Stack: " + error.stack);
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
        if (showDebug)  aa.env.setValue("ErrorMessage", debug);
    }
    else
    {
        aa.env.setValue("ErrorCode", "0");
        if (showMessage) aa.env.setValue("ErrorMessage", message);
        if (showDebug)  aa.env.setValue("ErrorMessage", debug);
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
function setFieldValue(fieldName, asiGroups, value)
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
                    field.setChecklistComment(value);
                    group.setFields(fields);
                }
            }
        }
    }
    return asiGroups;
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


function getRecsByAddressDbaMatch(dbaName, addressModel, minMatchScore){
    var finalArray = new Array();
    var exactMatchArr = new Array();
    var matchScoreArr = new Array();
    var recMap = aa.util.newHashMap();

    var capAddResult = aa.cap.getCapListByDetailAddress(addressModel.getStreetName(),addressModel.getHouseNumberStart(),null,null,null,null);
    if (capAddResult.getSuccess()){
        var capIdArray = capAddResult.getOutput();
        for(addrCapId in capIdArray){
            var thisCapId = capIdArray[addrCapId].getCapID();
            if(appMatch("Licenses/DBA/NA/NA", thisCapId)){
                var addressDBA = getAppSpecific("Organization Name", thisCapId);
                var closeMatchScore = getWordMatchScore(String(thisDBA), String(addressDBA));
                if (closeMatchScore > minMatchScore) {
                    recMap.put(thisCapId.getCustomID(),true);
                    var thisAsitRow = new Array();
                    thisAsitRow.score = closeMatchScore;
                    thisAsitRow["DBA Record ID"] = thisCapId.getCustomID();
                    thisAsitRow["Address"] = addressModel.getHouseNumberStart() + " " + addressModel.getStreetName();
                    thisAsitRow["DBA Name"] = addressDBA;
                    if (String(thisDBA).toLowerCase() == String(addressDBA).toLowerCase()) {
                        exactMatchArr.push(thisAsitRow);
                    } else {
                        matchScoreArr.push(thisAsitRow);
                    }
                }
            }
        }
    }
    matchScoreArr.sort(function sortDescByScore(a, b) {
        return b.score - a.score;
    })
    var dbaOtherAddressArr = getRecsByDbaMatch(dbaName , recMap);
    finalArray = exactMatchArr.concat(matchScoreArr).concat(dbaOtherAddressArr);
    return finalArray;
}

function getRecsByDbaMatch(thisDBA, recMap){
    var resultArr = new Array();
    var getCapResult = aa.cap.getCapIDsByAppSpecificInfoField("Organization Name",thisDBA);
    if (getCapResult.getSuccess()){
        var capIdArray = getCapResult.getOutput();
        for(id in capIdArray){
            var thisID = capIdArray[id].getCapID();
            var thisCapId = aa.cap.getCapID(thisID.ID1,thisID.ID2,thisID.ID3).getOutput();
            if (!recMap.get(thisCapId.getCustomID())) {
                if(appMatch("Licenses/DBA/NA/NA", thisCapId)){
                    var thisAsitRow = new Array();
                    thisAsitRow["DBA Record ID"] = thisCapId.getCustomID();
                    thisAsitRow["Address"] = "";
                    var cap = aa.cap.getCap(capId).getOutput();
                    var capAddresses = getCapAddress(thisCapId);
                    if (capAddresses != null && capAddresses.length != 0) {
                        for (loopk in capAddresses) {
                            addressModel = capAddresses[loopk];
                            if (addressModel.getPrimaryFlag() == "Y") {
                                thisAsitRow["Address"] = addressModel.getHouseNumberStart() + " " + addressModel.getStreetName();
                            }
                        }
                    }
                }
                thisAsitRow["DBA Name"] = thisDBA;
                resultArr.push(thisAsitRow);
            }
        }
        return resultArr;
    }
}

function getWordMatchScore(word1, word2) {
    var noiseWords = ["'s", "'n"];
    var noiseChars = ["'", ".", "-", ",", "&", " ", "`", "@", "#", "$", "%", "^", "*"];

    for (var i = 0; i < noiseWords.length; i++) {
        var regExp = new RegExp(noiseWords[i], 'gi');
        word1 = word1.replace(regExp, '');
        word2 = word2.replace(regExp, '');
    }

    for (var i = 0; i < noiseChars.length; i++) {
        var regExp = new RegExp('\\' + noiseChars[i], 'gi');
        word1 = word1.replace(regExp, '');
        word2 = word2.replace(regExp, '');
    }

    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();

    var score = 0;
    var longestLength = Math.max(word1.length, word2.length);

    for (var i = 0; i < longestLength; i++) {
        if (word1[i] === word2[i]) {
            score++;
        }
    }

    return (score / longestLength) * 100;
}