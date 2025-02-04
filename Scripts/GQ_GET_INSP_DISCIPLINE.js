/**
 * GQ_GET_INSP_DISCIPLINE.js
 * Requires Accela 20.2 or Later
 * Copyright Gray Quarter Inc. 2022
 */
var showDebug = false;
//aa.env.setValue("REQUEST",'[144,146]');
var json = aa.env.getValue("REQUEST");
var spc = String(aa.getServiceProviderCode());
var sql = "SELECT INSP_SEQ_NBR, INSP_DISCIPLINE FROM RINSP_DISCIPLINE WHERE REC_STATUS='A' AND SERV_PROV_CODE='{0}' AND INSP_SEQ_NBR IN ({1})";
var usrArr = {};
sql = sql.replace("{0}",spc);
try{
    var req = [];
    req = JSON.parse(json);
    req = req.join(",");
    sql = sql.replace("{1}",req.toUpperCase());
    logDebug(sql);
    var ds = getDataSet(sql);
    
    for(var u in ds){
        if(usrArr[String(ds[u]["INSP_SEQ_NBR"])] == null){
            usrArr[String(ds[u]["INSP_SEQ_NBR"])] = [];
        }
        usrArr[String(ds[u]["INSP_SEQ_NBR"])].push(String(ds[u]["INSP_DISCIPLINE"]));
    }
    aa.env.setValue("IS_ERROR","false");
    aa.env.setValue("ERR_MSG","");
    var resp = JSON.stringify(usrArr);
    logDebug("Response:" + resp);
    aa.env.setValue("RESPONSE",resp);
}
catch(err){
    aa.env.setValue("IS_ERROR","true");
    aa.env.setValue("ERR_MSG",err.message);
    aa.env.setValue("RESPONSE","");
}


function getDataSet(SQL) {
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
        throw("DATA SET ERROR: " + dq.getErrorMessage());
    }
    return dataSet;
}

function logDebug(vmsg){
    if(showDebug){
        aa.print(vmsg)
    }
}