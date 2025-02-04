/* 
GQ_DOCUSIGN_GEN_REPORT.js
Author: Gray Quarter Inc. (c)2024
Usage: Called from Async Script.  This script runs a report through ASYNC scripting
    you should not need to edit this code.

    This Script should not be modified except by Gray Quarter.
    
Version: 1.1
*/

//LOAD THE DOCUSIGN LIBRARY
include("GQ_DOCUSIGN_LIBRARY");

var gqOptions = aa.env.getValue("gqOptions");
var gqOptions = JSON.parse(gqOptions);

//1. Run the Report, this report
var reportParameters = aa.util.newHashMap();
if(gqOptions["GQ_DOCUSIGN_GEN_REPORT"]["ReportInfo"]["Parameters"]){
    for(var parameter in gqOptions["GQ_DOCUSIGN_GEN_REPORT"]["ReportInfo"]["Parameters"]){
        var par = gqOptions["GQ_DOCUSIGN_GEN_REPORT"]["ReportInfo"]["Parameters"][parameter];
        for(var pname in par){
            reportParameters.put(pname, par[pname]);
            logDebug( pname + " = " + par[pname]);
        }  
    }
}

logDebug("call generateReportSavetoEDMS()");
gq.util.generateReportSavetoEDMS(capId
    , gqOptions["GQ_DOCUSIGN_GEN_REPORT"]["ReportInfo"]["ReportName"]
    , gqOptions["GQ_DOCUSIGN_GEN_REPORT"]["ReportInfo"]["ReportModule"]
    , reportParameters
);