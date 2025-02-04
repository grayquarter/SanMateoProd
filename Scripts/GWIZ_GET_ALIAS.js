var testSessionId;
// testSessionId = "773b6c56d77f4091b31afaea865fb1a2";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
var sessionObject = gqWizardLoadSession(gq_session);
if (!sessionObject) {
    logDebug("Session object not found.");
    sessionObject = {
        formData: {},
        sessionData: {},
    }
}
var formData = sessionObject.formData;
var appTypeString = formData.recordType;
var appTypeArray = appTypeString.split("/");

var selectStatement = "SELECT R1_APP_TYPE_ALIAS \
    FROM R3APPTYP \
    WHERE REC_STATUS = 'A' \
        AND SERV_PROV_CODE = '" + aa.getServiceProviderCode() + "' \
        AND R1_PER_GROUP = ? AND R1_PER_TYPE = ? AND R1_PER_SUB_TYPE = ? AND R1_PER_CATEGORY = ?";

var result = aa.db.select(selectStatement, [appTypeArray[0], appTypeArray[1], appTypeArray[2], appTypeArray[3]]).getOutput();
var alias = result.toArray()[0].get("R1_APP_TYPE_ALIAS");
logDebug("Alias: " + alias);
aa.env.setValue("appTypeAlias", alias);

//Custom Functions
function props(objExplore) {
    logDebug("Properties:")
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) != "function") {
            logDebug("  <b> " + x + ": </b> " + objExplore[x]);
            aa.print(x + " : " + objExplore[x]);
        }
    }
}

//Utility Functions

function lookup(stdChoice, stdValue) {
    var strControl;
    var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);

    if (bizDomScriptResult.getSuccess()) {
        var bizDomScriptObj = bizDomScriptResult.getOutput();
        strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
        logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
    }
    else {
        logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
    }
    return strControl;
}

function logDebug(dstr) {
    aa.print(dstr + "<BR>")
}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode) servProvCode = aa.getServiceProviderCode();
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

function gqWizardLoadSession() {

    var urlVar = "";
    if (arguments.length == 2) {
        urlVar = "?" + arguments[1];  // used for session refresh and maybe more
    }

    var GQ_SESSION_ASI = lookup("GRAYQUARTER", "WIZARD_SESSION_ASI");
    if (arguments.length >= 1) {
        gqsession = arguments[0]; // use session id
        logDebug("GRAYQUARTER USING SESSION ID : " + gqsession);
    } else {

        if (!GQ_SESSION_ASI || GQ_SESSION_ASI == "") {
            logDebug("GRAYQUARTER WIZARD_SESSION_ASI field not configured in bizdomain");
            return false;
        }

        var gqsession = AInfo[GQ_SESSION_ASI];
        if (!gqsession || gqsession == "") {
            logDebug("GRAYQUARTER WIZARD_SESSION_ASI field (" + GQ_SESSION_ASI + ") has no value, exiting");
            return false;
        }
    }

    var GQ_API_KEY = lookup("GRAYQUARTER", "WIZARD_API_KEY");

    if (!GQ_API_KEY || GQ_API_KEY == "") {
        logDebug("GRAYQUARTER Wizard API key not configured");
        return false;
    }

    var GQ_API_URL = lookup("GRAYQUARTER", "WIZARD_API_URL");
    if (!GQ_API_URL || GQ_API_URL == "") {
        logDebug("GRAYQUARTER Wizard URL key not configured");
        return false;
    }

    var resp = gqHttpClient((GQ_API_URL.replace("{0}", gqsession)) + urlVar, "GET", GQ_API_KEY);
    if (resp.code != 200) {
        logDebug("GRAYQUARTER Wizard API call failure.  Bad/mismatch API key?  Wizard session not started via GQ IPAAS? HTTPCode=" + resp.code);
    }

    var jobj = resp.body;

    return jobj;
}
function gqHttpClient(url, method, apiKey, obj) {
    var connection;
    try {
        java.lang.System.setProperty("https.protocols", "TLSv1.2");
        var httpMethod = method ? method : "GET";
        var javaUrl = new java.net.URL(url);
        connection = javaUrl.openConnection();
        connection.setRequestMethod(httpMethod);
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("Content-Type", "application/json");

        connection.setRequestProperty("X-API-Key", apiKey);

        connection.setUseCaches(false);
        connection.setDoOutput(true);
        if ((httpMethod.equals("POST") || httpMethod.equals("PUT")) && obj) {
            var payloadString = new java.lang.String(JSON.stringify(obj));
            var payload = payloadString.getBytes("UTF-8");
            var body;
            try {
                body = connection.getOutputStream();
                body.write(payload, 0, payload.length);
                body.flush();
            }
            finally {
                if (body) {
                    body.close();
                }
            }
        }
        var statusCode = connection.getResponseCode();
        var response = {
            code: statusCode
        };
        if (statusCode >= 200 && statusCode < 300) {
            var input;
            try {
                input = connection.getInputStream();
                if (input) {
                    var responseBuffer = new java.lang.StringBuffer();
                    var reader;
                    try {
                        reader = new java.io.BufferedReader(
                            new java.io.InputStreamReader(input));
                        var inputLine;
                        while ((inputLine = reader.readLine()) !== null) {
                            responseBuffer.append(inputLine);
                        }
                        var responseBody =
                            responseBuffer.length() > 0
                                ? JSON.parse(responseBuffer.toString())
                                : null;
                        response.body = responseBody;
                    }
                    finally {
                        if (reader) {
                            try {
                                reader.close();
                            } catch (err) { }
                        }
                    }
                }
            }
            finally {
                if (input) {
                    try {
                        input.close();
                    } catch (err) { }
                }
            }
        }
        return response;
    }
    finally {
        if (connection) {
            connection.disconnect();
        }
    }
}