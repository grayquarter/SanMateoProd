/**
 * GQ_GET_INSPECTORS_BY_DISCPLINE.js
 * Requires Accela 20.2 or Later
 * Copyright Gray Quarter Inc. 2022
 */
 var showDebug = false;
 //aa.env.setValue("REQUEST",JSON.stringify(['Plumbing', 'Fire']));
 var json = aa.env.getValue("REQUEST");
 var spc = String(aa.getServiceProviderCode());
 var sql = "select USER_NAME, INSP_DISCIPLINE from PUSER_DISCIPLINE WHERE REC_STATUS='A' AND SERV_PROV_CODE='{0}'";
 var usrArr = {};
 sql = sql.replace("{0}", spc);
 try {
     var req = [];
     req = JSON.parse(json);     
     logDebug(req)
     //sql = sql.replace("{1}", req.toUpperCase());
     requestMap = {};
     for(var requestIndex in req) {
        var requestedDisc = req[requestIndex];
        if(!requestMap[requestedDisc]) {
            requestMap[requestedDisc] = true;
        }
     }
     logDebug(sql);
     var ds = getDataSet(sql);
     var userNamePointer = null;
     var captureInsp = false;
     var discCollection = [];
     returnObj = [];
     ds.sort(function (a, b) {
        const nameA = String(a.USER_NAME).toUpperCase(); // ignore upper and lowercase
        const nameB = String(b.USER_NAME).toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
     });
     for (var u in ds) {
        var dataObj = ds[u];
        var userName = dataObj["USER_NAME"];
        var disciplines = dataObj["INSP_DISCIPLINE"];
        logDebug(userName + " " + disciplines);
        if(!userNamePointer || userNamePointer != userName) {            
            if(captureInsp) {
                logDebug("Fetching: " + userNamePointer)
                properties = aa.person.getUser(userNamePointer).getOutput();
                var user = grabProperties(properties);
                user.disciplines = discCollection;
                captureInsp = false;
                returnObj.push(user);
            }
            discCollection = [];
            userNamePointer = userName;
        }
        if(requestMap[disciplines]) {
            //logDebug(userName + " " + disciplines);
            captureInsp = true;
        }
        discCollection.push(String(disciplines));
     }
     //leftovers
     if(captureInsp) {
        logDebug("Fetching: " + userNamePointer)
        properties = aa.person.getUser(userNamePointer).getOutput();
        var user = grabProperties(properties);
        user.disciplines = discCollection;        
        returnObj.push(user);
    }     
     aa.env.setValue("IS_ERROR", "false");
     aa.env.setValue("ERR_MSG", "");
     var resp = JSON.stringify(returnObj);
     logDebug("Response:" + resp);
     aa.print(resp);
     aa.env.setValue("RESPONSE", resp);
 }
 catch (err) {
     aa.env.setValue("IS_ERROR", "true");
     aa.env.setValue("ERR_MSG", err.message);
     aa.env.setValue("RESPONSE", "");
     aa.print(err + " " +  err.lineNumber);
 }
 
 
function getDataSet(SQL) {
    try {
        var dq = aa.db.select(SQL, []);
        var dataSet = [];
        if (dq.getSuccess()) {
            var dso = dq.getOutput();
            if (dso) {
                var ds = dso.toArray();
                for (var x in ds) {
                    var row = ds[x];
                    var ks = ds[x].keySet().toArray();
                    var dsRow = {};
                    for (var c in ks) {
                        dsRow[String(ks[c]).toUpperCase()] = row.get(ks[c]);
                    }
                    dataSet.push(dsRow);
                }
            }
        }
        else {
            throw ("DATA SET ERROR: " + dq.getErrorMessage());
        }
        return dataSet;
    } catch (error) {
        aa.print(error);
    }
    return false;
}

function logDebug(vmsg) {
    if (showDebug) {
        aa.print(vmsg)
    }
}

function grabProperties(obj) {
    newObj = {};
    for (prop in obj) {
        if (typeof(obj[prop]) != "function") {
            returnVal = obj[prop];
            if(!returnVal) {
                returnVal = "";
            }
            newObj[prop] = String(returnVal);
        }
    }
    return newObj;
}