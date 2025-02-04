//ASA:LICENSES/CONTRACTOR/GENERAL/APPLICATION

if(AInfo["Electrical"] == "CHECKED") {
    var ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();
        ctm.setGroup("Licenses");
        ctm.setType("Contractor");
        ctm.setSubType("Electrical");
        ctm.setCategory("Application");

    var childId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE TMP").getOutput();
    if(childId) aa.cap.createAssociatedFormsHierarchy(capId, childId);
}

if(AInfo["Plumbing"] == "CHECKED") {
    var ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();
        ctm.setGroup("Licenses");
        ctm.setType("Contractor");
        ctm.setSubType("Plumbing");
        ctm.setCategory("Application");

    var childId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE TMP").getOutput();
    if(childId) aa.cap.createAssociatedFormsHierarchy(capId, childId);
}