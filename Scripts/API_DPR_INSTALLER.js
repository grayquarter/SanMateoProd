function loadScript(scriptName) {
    scriptName = scriptName.toUpperCase();
    var emse = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var script = emse.getScriptByPK(aa.getServiceProviderCode(), scriptName, "ADMIN");
    return script.getScriptText() + "";
}

eval(loadScript("DPR_INSTALLER"));

Dpr.Installer.install();