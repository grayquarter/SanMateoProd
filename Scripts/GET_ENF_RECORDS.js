var testSessionId;
// testSessionId = "7d30f23408ba45388830a4ef02aee00a";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
eval(getScriptText("GQ_WIZARD_LIBRARY"));
var sessionObject = gqWizardLoadSession(gq_session);
if (!sessionObject) {
    logDebug("Session object not found.");
    sessionObject = {
        formData: {},
        sessionData: {},
    }
}
var formData = sessionObject.formData;
var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
try {
    var jsonRecs = [];

    var fourLevelType = formData.recordType;
    
    var fourLevelArray = fourLevelType.split("/");

    var sqlString = "SELECT * FROM B1PERMIT WHERE SERV_PROV_CODE = 'PARTNER08' AND B1_PER_GROUP = ? AND B1_PER_TYPE = ? AND B1_PER_SUB_TYPE = ? AND B1_PER_CATEGORY = ?"
    var results = aa.db.select(sqlString, [fourLevelArray[0], fourLevelArray[1], fourLevelArray[2], fourLevelArray[3]]).getOutput();
    results = results.toArray();
    aa.env.setValue("gqTotalRecords", results.length);
    for (var i in results) {
        var record = results[i];
        if (record.get("B1_APPL_CLASS") != "COMPLETE") continue;
        var recordJson = {
            altId: String(record.get("B1_ALT_ID")),
            status: String(record.get("B1_APPL_STATUS")) || "",
            alias: String(record.get("B1_APP_TYPE_ALIAS")),
            appName: String(record.get("B1_SPECIAL_TEXT")),
            lat: null,
            long: null,
        }
        var capId = aa.cap.getCapID(recordJson.altId).getOutput();
        recordJson.deeplink = gqGetCustomACAUrl(capId, acaUrl);
        var asi = aa.appSpecificInfo.getByCapID(capId).getOutput();
        asi.forEach(function (item) {
            if (item.getCheckboxDesc() == "Latitude") recordJson.lat = parseFloat(item.getChecklistComment(), 10);
            if (item.getCheckboxDesc() == "Longitude") recordJson.long = parseFloat(item.getChecklistComment(), 10);
        });
        if (!recordJson.lat || !recordJson.long) {
            continue;
        }
        jsonRecs.push(recordJson);
    }

    logDebug("Found " + jsonRecs.length + " records from " + results.length + " results");
    logDebug("JSON: " + JSON.stringify(jsonRecs[0]));
    aa.env.setValue("gqRequestedRecords", JSON.stringify(jsonRecs));
    // Get addr values
    // var address = aa.address.getAddressByCapId(capId).getOutput();
    // var lat = address[0].YCoordinator;
    // var lon = address[0].XCoordinator;

    // Log out each parameter
    // var result = results[0].keySet().toArray();
    // result.forEach(function (item) {
    //     logDebug(item + ": " + results[0].get(item));
    // });

    aa.env.getParamValues();
}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
//Custom Functions
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

function gqGetCustomACAUrl(itemCap, acaUrl, routeId) {

    // returns the path to the record on ACA.  Needs to be appended to the site    

    acaUrl = acaUrl.substr(0, acaUrl.toUpperCase().indexOf("/ADMIN"));
    var id1 = itemCap.getID1();
    var id2 = itemCap.getID2();
    var id3 = itemCap.getID3();
    var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();
    if (!routeId) {
        routeId = "1000";
    }
    acaUrl += "/urlrouting.ashx?type=" + routeId;
    acaUrl += "&Module=" + itemCapModel.getModuleName();
    acaUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
    acaUrl += "&agencyCode=" + aa.getServiceProviderCode();
    acaUrl += "&FromACA=Y";
    return acaUrl;
}

function slackProps(objExplore) {
    var ostr = "Properties:";

    for (var x in objExplore) {
        if (typeof(objExplore[x]) != "function") {
            ostr +=  x + " : " + objExplore[x] + "\n";
        }   
    }

    slack(ostr);
    
}
function slack(msg) {
    if(msg.indexOf("<BR>") >= 0) {
        msg.replace(/<BR>/g, "\n");
    }
    var headers=aa.util.newHashMap();
    headers.put("Content-Type","application/json");
    var body = {};  
    body.text = aa.getServiceProviderCode() + ":" + "SUPP" + ": " + msg;
    //GQ Slack
    var SLACKURL = "https://hooks.slack.com/services/";
    SLACKURL = SLACKURL + "T5BS1375F/";
    SLACKURL = SLACKURL + "B04FYRTLEEQ/RJUIqodbkT3c7XbOZdnYbcal";
    var apiURL = SLACKURL;  // from globals
    var result = aa.httpClient.post(apiURL, headers, JSON.stringify(body));
    if (!result.getSuccess()) {
        logDebug("Slack get anonymous token error: " + result.getErrorMessage());
    } else {    
        aa.print("Slack Results: " + result.getOutput());
    }
}
function lookup(stdChoice,stdValue) 
	{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice,stdValue);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
		}
	else
		{
		logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
		}
	return strControl;
	}

function logDebug(dstr) {
    aa.print(dstr + "<BR>")
}

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
