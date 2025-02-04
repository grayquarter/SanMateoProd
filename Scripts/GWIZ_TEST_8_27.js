/* SET TEST SESSION */
var testSessionId;
// testSessionId = "d443ac970fdf440ca86dcdc8d7b74d07";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);

/* BEGIN MAIN CODE */
try {
    // Load Session
    var gq_session = aa.env.getValue("gqinsession_id");
    eval(getScriptText("GQ_WIZARD_LIBRARY"))
    var sessionObject = gqWizardLoadSession(gq_session);
    var formData = sessionObject.formData;
    var sessionData = sessionObject.sessionData;
    
    var myAddress = parseInt(formData["myNum"]);
    var newNum = myAddress * 2;
    aa.env.setValue("response", newNum);
}
catch (err) {
    logDebug(err)
}
// End Main Code
/* UTILITY FUNCTIONS */

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
    aa.print(dstr + "<br>");
}

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