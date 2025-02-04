var myUserId = "ADMIN";

// testing
//aa.env.setValue("gqinsession_id","18da09d689b6408ea2927bd6e2b4709a");
var session = decodeURIComponent(String(aa.env.getValue("gqinsession_id")));

//var pParcel = "105";
/* ASA  */
var eventName = "CUSTOM_EMSE";

var useProductScript = true; // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = false; // set to true to simulate the event and run all std choices/scripts for the record type.

/* master script code don't touch */
var SCRIPT_VERSION = 3.0;
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
    useSA = true;
    SA = bzr.getOutput().getDescription();
    bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
    if (bzr.getSuccess()) {
        SAScript = bzr.getOutput().getDescription();
    }
}
if (SA) {
    eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductScript));
    eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductScript));
    eval(getScriptText(SAScript, SA, useProductScript));
} else {
    eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductScript));
    eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductScript));
}
eval(getScriptText("INCLUDES_CUSTOM", null, useProductScript));

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


//
// User code goes here
//

try {
    showDebug = false;
    var capId = null;
    if (session) {
        var gq_session = aa.env.getValue("gqinsession_id");
        // aa.print(getScriptText("GQ_WIZARD_LIBRARY"));
        eval(getScriptText("GQ_WIZARD_LIBRARY"))
        var s = gqWizardLoadSession(gq_session);

        if (s) {
            var a = s.formData;
            aa.print(JSON.stringify(s));
            var pCapId = aa.cap.getCapID(a.recordId).getOutput();
            var rCapId = aa.cap.getCapID(a.token).getOutput();
            var c = aa.cap.getCapByPK(rCapId, true).getOutput();
            var capId = aa.cap.createRegularCapModel4ACA(c, "", false, false).getOutput().getCapID();
            var capModel = aa.cap.getCap(capId).getOutput().getCapModel();
            var asa = aa.cap.runEMSEScriptAfterApplicationSubmit(capModel, pCapId);
            var ctrca = aa.cap.runEMSEScriptAfterCreateRealCap(capModel, capId);
            aa.print("ASA: " + asa.getSuccess() + ":" + asa.getOutput());
            aa.print("CTRCA: " + ctrca.getSuccess() + ":" + ctrca.getOutput());
        }
    }

    aa.env.setValue("GQ_recordURL", scriptNULL(getACAUrl2()));
    aa.print("GQ_recordURL = " + getACAUrl2());
    aa.env.setValue("GQ_recordId", scriptNULL(capId.getCustomID()));
    if (showDebug) {
        aa.env.setValue("GQ_debug", debug);
    }

    //SMS
    var reqPhone = "15599202572";
    var pars = aa.util.newHashtable();
    pars.put("$$CAPID$$", String(scriptNULL(capId.getCustomID())));
    getACAUrl2Sms(pars,capId) 
    gqSendCommunication("RENEWAL_MESSAGE", pars, String(reqPhone), "", "", "", "GQ_RENEWAL_SUBMIT")

} catch (err) {
    aa.print(err.message + ":" + err.lineNumber + " " + err.stack);
    aa.env.setValue("debug", debug + ":" + err.message);
}

if (showDebug) {
    aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug)
}


function getACAUrl2Sms(pars,itemCap) {

    // returns the path to the record on ACA.  Needs to be appended to the site

    var id1 = itemCap.getID1();
    var id2 = itemCap.getID2();
    var id3 = itemCap.getID3();
    var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();

    pars.put("$$MODULE$$",String(itemCapModel.getModuleName()));
    pars.put("$$ID1$$",String(id1))
    pars.put("$$ID2$$",String(id2))
    pars.put("$$ID3$$",String(id3))
    pars.put("$$AGENCYCODE$$",String(aa.getServiceProviderCode()))

    return pars;
}


function getACAUrl2() {

    // returns the path to the record on ACA.  Needs to be appended to the site

    var itemCap = (arguments.length == 1) ? arguments[0] : capId;
    var enableCustomWrapper = lookup("ACA_CONFIGS", "ENABLE_CUSTOMIZATION_PER_PAGE");
    var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
    acaUrl = acaUrl.substr(0, acaUrl.toUpperCase().indexOf("/ADMIN"));
    var id1 = itemCap.getID1();
    var id2 = itemCap.getID2();
    var id3 = itemCap.getID3();
    var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();

    acaUrl += "/urlrouting.ashx?type=1009";
    acaUrl += "&Module=" + itemCapModel.getModuleName();
    acaUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
    acaUrl += "&agencyCode=" + aa.getServiceProviderCode();
    if (matches(enableCustomWrapper, "Yes", "YES"))
        acaUrl += "&FromACA=Y";

    return acaUrl;
}