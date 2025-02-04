try {
    slack(iterateAndLogitem(this));
}
catch (err) {
    slack("Found error: " + err + " " + err.message + " " + err.stack);
}


// end user code
// logDebug("---END OF TEST CODE")
// aa.env.setValue("ScriptReturnCode", "0"); 	aa.env.setValue("ScriptReturnMessage", debug)

//Custom Functions


//Utility Functions

function iterateAndLogitem(item) {
    var slackStr = "";
    for (var key in item) {
        if (item.hasOwnProperty(key)) {
            if (typeof item[key] != "function") {
                var varName = key;
                var varValue = "";
                try {
                    if (typeof item[key] != "object") {
                        varValue = typeof item[key];
                    } else if (item[key] == null) {
                        varValue = null;
                    } else {
                        varValue = item[key].class;
                    }
                } catch (error) {
                    varValue = "[";
                    for (var i in item[key]){
                        varValue += typeof item[key][i];
                        if (i < item[key].length - 1) {
                            varValue += ", ";
                        }
                    }
                    varValue += "]";
                    continue;
                }
                varValue = trimClass(varValue);
                if (varValue == "ScriptResult") {
                    if (!!item[key].output) {
                        varValue = "ScriptResult<" + trimClass(item[key].output) + ">"
                    } else {
                        varValue = "ScriptResult<any>"
                    }
                }
                slackStr +="declare var " + varName + ": " + varValue + "\n<br>";
            }
        }  
    }
    return slackStr;
}

function trimClass(className) {
    className = String(className);
    var classArray = className.split(".");
    if (classArray.length == 1) {
        return className;
    }
    classArray = classArray[classArray.length - 1];
    if (classArray.indexOf("@") > -1) {
        classArray = classArray.split("@")[0];
    }
    return classArray;
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