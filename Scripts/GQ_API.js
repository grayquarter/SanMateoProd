function deployScript(scriptId, scriptText) {
    try {
        if (!scriptId || scriptId.length === 0) {
            envReturn(-2, "Bad request, missing script id");
            return;
        }

        if (!scriptText || scriptText.length === 0) {
            envReturn(-2, "Bad request, missing script text");
            return;
        }

        var user = aa.getAuditID() + "";
        if (!user || user.length === 0) {
            user = "ADMIN";
        }
        
        saveScript(scriptId, scriptText, user);

        var emse = new com.accela.aa.emse.emse.EMSEBusiness();
        emse.cleanScriptCache();
    }
    catch (error) {
        envReturn(-2, error.message);
    }
}

function saveScript(script, content, user) {
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var emseDAO = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.ScriptDAOMSSQL").getOutput();

    var scriptDate =  new Date();
    var scriptModel = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.ScriptModel").getOutput();
    var creating = false;

    try { 
        var result = emseBiz.getScriptByPK(aa.getServiceProviderCode(), script, user); 	
        creating = !result;
    } 
    catch(err) {
        creating = true;
    }

    scriptModel.setDescription(null);
    scriptModel.setServiceProviderCode(aa.getServiceProviderCode());
    scriptModel.setScriptName(script);
    scriptModel.setScriptText(content);
    scriptModel.setSripteCode(script);
    scriptModel.setAuditID(user);
    scriptModel.setAuditDate(scriptDate);
    scriptModel.setAuditStatus("A");

    if (creating) {
        envReturn(0, "Creating script: " + script);
        emseDAO.createScript(scriptModel);
    }
    else {
        envReturn(0, "Updating script: " + script);
        emseDAO.editScript(scriptModel);
    }
}

function getStandardChoice(pstdChoice) {
    var stdChoice = {};
    var serviceProviderCode = aa.getServiceProviderCode();
    var stdChoiceQuery = "SELECT BD.BIZDOMAIN as pNAME, BD.DESCRIPTION as pDESC, BD.REC_STATUS as pACTIVE, BD.STD_CHOICE_TYPE as pTYPE " +
                "FROM RBIZDOMAIN BD " +
                "WHERE BD.SERV_PROV_CODE = '" + serviceProviderCode + "' " +
                "AND BD.BIZDOMAIN = '" + pstdChoice + "'";
    var stdChoice_Result = aa.db.select(stdChoiceQuery, []);
    if (stdChoice_Result.getSuccess() && !stdChoice_Result.getOutput().empty) {
        var stdChoice_Output = stdChoice_Result.getOutput().toArray()[0];
        stdChoice.name = String(stdChoice_Output.get("pNAME"));
        stdChoice.description = String(stdChoice_Output.get("pDESC"));
        stdChoice.active = String(stdChoice_Output.get("pACTIVE"));
        stdChoice.type = String(stdChoice_Output.get("pTYPE"));

        var dataSQL = "SELECT BV.BIZDOMAIN_VALUE AS pKEY, BV.VALUE_DESC AS pVALUE, BV.REC_STATUS AS pACTIVE " +
                    "FROM RBIZDOMAIN_VALUE BV " +
                    "WHERE BV.SERV_PROV_CODE = '" + serviceProviderCode + "' " +
                    "AND BV.BIZDOMAIN = '" + pstdChoice + "'";
        var data_Result = aa.db.select(dataSQL, []);
        if (data_Result.getSuccess() && !data_Result.getOutput().empty) {
            var data_Output = data_Result.getOutput().toArray();
            var choices = [];
            for (var i in data_Output) {
                var choice = data_Output[i];
                choices.push({
                    key: String(choice.get("pKEY")),
                    value: String(choice.get("pVALUE")),
                    active: String(choice.get("pACTIVE"))
                });
            }
            stdChoice.choices = choices;
        } else {
            envReturn(-2, "Error getting standard choice keys and values.");
            return;
        }
    } else {
        envReturn(-2, "Error getting standard choice.");
        return;
    }
    envReturn(-1, JSON.stringify(stdChoice));
}

function scriptTest(scriptText, commit) {
    try {
        var service = com.accela.aa.emse.dom.service.CachedService.getInstance().getEMSEService();
        var htResult = service.testScript(scriptText, aa.getServiceProviderCode(), aa.env.getParamValues(), 'ADMIN', commit);
        var htResponse = htResult.get("ScriptReturnDebug");
        envReturn(commit ? 0 : -1, htResponse);
    } catch (e) {
        envReturn(-2, "Error running script: " + e);
    }
}

function envReturn(code, response) {
    aa.env.setValue("ScriptReturnCode", String(code));
    aa.env.setValue("SCRIPT_RESULT", String(response));
}

function main() {
    var action = aa.env.getValue("action") + "";
    if (!action || action.length === 0) {
        envReturn(-2, "Bad request, no action found in GQ_API environment script.");
        return;
    }

    if(action === "test") {
        var testText = aa.env.getValue("text") + "";
        var commit = String("true").equals(aa.env.getValue("commit") + "");
        scriptTest(testText, commit);

    } else if (action === "getChoice") {
        var choiceName = aa.env.getValue("choice");
        getStandardChoice(choiceName);

    } else if (action === "deploy") {
        var scriptId = aa.env.getValue("id") + "";
        var scriptText = aa.env.getValue("text") + "";
        deployScript(scriptId, scriptText);
    } else {
        envReturn(-2, "Bad request, action not configured in GQ_API environment script.");
        return;
    }
}

main();