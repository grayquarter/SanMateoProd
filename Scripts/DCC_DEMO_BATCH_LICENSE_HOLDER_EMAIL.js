function logDebug(str){aa.print(str)}

function sendNotificationLOCAL(emailFrom,emailTo,emailCC,templateName,params,reportFile,itemCap){
    var capIDScriptModel = aa.cap.createCapIDScriptModel(itemCap.ID1, itemCap.ID2, itemCap.ID3);
    var result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
    if(result.getSuccess()){
        return true;
    } else {
        logDebug("Failed to send email: " + result.getErrorType() + " " + result.getErrorMessage());
        return false;
    }
}

var q = "Select a.b1_alt_id, b.b1_email From B1PERMIT as A JOIN B3CONTACT as B on a.serv_prov_code = b.serv_prov_code and a.b1_per_id1 = b.b1_per_id1 and a.b1_per_id2 = b.b1_per_id2 and a.b1_per_id3 = b.b1_per_id3 Where    a.serv_prov_code = 'PARTNER08'    AND a.b1_appl_class = 'COMPLETE'    AND b.B1_Contact_type = 'License Holder'    and a.B1_PER_group = 'Licenses'"
var res = aa.db.select(q,[]);

if(res.getSuccess()) {
    res = res.getOutput().toArray();
    // logDebug("Result: " + res);

    for(var r in res) {
        logDebug("Record: " + res[r].get("b1_alt_id") + " email: " + res[r].get("b1_email"));
        var capId = aa.cap.getCapID(res[r].get("b1_alt_id"));

        if(!capId.getSuccess()) {
            logDebug("CapId ScriptResult for " + res[r].get("b1_alt_id") + " failed: " + capId.getErrorType() + " -> " + capId.getErrorMessage());
            continue;
        }

        capId = capId.getOutput();

        var vEParams = aa.util.newHashtable();
        vEParams.put("$$record$$",capId.getCustomID());
    
        //Don't attach to record, update query to just select contact types and drop the capId stuff
        // var result = aa.document.sendEmailByTemplateName("noreply@accela.com", res[r].get("b1_email"), null, "LICENSE_HOLDER_COMMUNICATION", vEParams, null);
        // if(result.getSuccess()) {
        //     result = result.getOutput();
        //     aa.print("Success: " + result);
        // } else {
        //     aa.print("ScriptResult failed: " + result.getErrorType() + " -> " + result.getErrorMessage());
        // }
        //Attach to record
        var result = sendNotificationLOCAL("noreply@accela.com",res[r].get("b1_email"),null,"LICENSE_HOLDER_COMMUNICATION",vEParams,null,capId);
        if(result) logDebug("Sent email to " + res[r].get("b1_email"));
    }

} else {
    logDebug("ScriptResult failed: " + res.getErrorType() + " -> " + res.getErrorMessage());
}