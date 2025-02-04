/*------------------------------------------------------------------------------------------------------/
| Program : PARTNER08_HIDE_PAGE_IF_NOT_DPR_RECORD.js
| Event   : ACA_Onload Event
|
| Usage   : Attach this script to the onload script and it will skip the page if the record is a DPR record.
|
| Client  : N/A
| Action# : N/A
|
| Notes   :
|
/------------------------------------------------------------------------------------------------------*/
function getScriptText(scriptName) {
    scriptName = scriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), scriptName, "ADMIN");
    return emseScript.getScriptText() + "";
}
eval(getScriptText("INCLUDES_DPR_BOOT"));
var cap = aa.env.getValue("CapModel");
var capType = cap.getCapType().toString() + "";
var capId = cap.getCapID();
//this is on the plans ack page
try {
    var plans = getCustomFieldPageflow("dprRecord");
    
    if ("No".equals(plans)) {
           
        aa.env.setValue("ReturnData", "{'PageFlow':{'HidePage':'Y'}}");
    } 
    aa.env.setValue("ErrorCode", "0");
} catch (error) {
    slack(error);
}
 
 
/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
 
function getCustomFieldPageflow(fieldLabel) {
    var capASI = cap.getAppSpecificInfoGroups();
    if (capASI) {
        var i = cap.getAppSpecificInfoGroups().iterator();
        while (i.hasNext()) {
            var group = i.next();
            var fields = group.getFields();
            if (fields) {
                var iteFields = fields.iterator();
                while (iteFields.hasNext()) {
                    var field = iteFields.next();
                    if (fieldLabel === field.getCheckboxDesc() + "") {
                        return field.getChecklistComment() + "";
                    }
                }
            }
        }
    }
}
 
function matches(value, toMatch) {
    for (var i = 0; i < toMatch.length; i++) {
        if (toMatch[i] === value) {
            return true;
        }
    }
    return false;
}
 
function slack(msg) {
    
    var headers=aa.util.newHashMap();
    headers.put("Content-Type","application/json");
    var body = {};    
    body.text = aa.getServiceProviderCode() + ":" + "PROD" + ": " + msg;
    var SLACKURL = "https://hooks.slack.com/services/";
    SLACKURL = SLACKURL + "T5BS1375F/";
    SLACKURL = SLACKURL + "BG09GQ3RS/NUs694ouyawHoAFK4jJXwn1p";
    var apiURL = SLACKURL;  // from globals
    var result = aa.httpClient.post(apiURL, headers, JSON.stringify(body));
    
    if (!result.getSuccess()) {
        logDebug("Slack get anonymous token error: " + result.getErrorMessage());
    } else {    
        aa.print("Slack Results: " + result.getOutput());
    }
}