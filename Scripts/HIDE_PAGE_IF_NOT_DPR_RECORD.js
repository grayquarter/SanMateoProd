/*------------------------------------------------------------------------------------------------------/| Program : HIDE_PAGE_IF_NOT_DPR_RECORD.js| Event   : ACA_Onload Event|| Usage   : Attach this script to the onload script and it will skip the page if the record is NOT a DPR |           record.||| Client  : N/A| Action# : N/A|| Notes   :|/------------------------------------------------------------------------------------------------------*/function getScriptText(scriptName) {    scriptName = scriptName.toUpperCase();    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();    var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), scriptName, "ADMIN");    return emseScript.getScriptText() + "";}eval(getScriptText("INCLUDES_DPR_BOOT"));var cap = aa.env.getValue("CapModel");var capId = cap.getCapID();/*------------------------------------------------------------------------------------------------------/| <===========Main=Loop================>|/-----------------------------------------------------------------------------------------------------*/if (!Dpr.isProject(capId)) {	aa.env.setValue("ReturnData", "{'PageFlow':{'HidePage':'Y'}}");}/*------------------------------------------------------------------------------------------------------/| <===========END=Main=Loop================>/-----------------------------------------------------------------------------------------------------*/aa.env.setValue("ErrorCode", "0");/*------------------------------------------------------------------------------------------------------/| <===========External Functions (used by Action entries)/------------------------------------------------------------------------------------------------------*/