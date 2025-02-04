/*******************************************************
| Script/Function: GQ_UTILITY_LIBRARY
| Created by: Dane Quatacker
| Created on: 2024-03-13
| Usage: Shared functions used by Gray Quarter, deploy to Accela invoke include("GQ_UTILITY_LIBRARY");
    This Script should not be modified except by Gray Quarter.
| V1.0 - 2024-03-13
| V1.1 - 2024-06-20 - Streamlined generateReportSavetoEDMS added optional user
 ********************************************************/

//LOAD DEPENDENCIES


//LOAD LIBRARY
if (typeof (gq) == 'undefined') {
    gq = {};
}
if (typeof (gq.util) == 'undefined') {
    //load if not already loaded
    gq.util = new gqUtilLibrary();
    if (typeof (logDebug) != "function") {
        logDebug = function (vmsg) { aa.print(vmsg); }
        logDebug("loaded default logDebug()");
    }
    if (typeof (logDebug) == "function") {
        logDebug("loaded via include GQ_UTILITY_LIBRARY " + gq.util.version);
    }
}

//LIBRARY OBJECT
function gqUtilLibrary() {
    this.version = 1.0;


    /**
     * Uses script tester and executs the script in the code section
     * requires EVENT_FOR_ASYNC.js
     * @param {*} pScriptName 
     * @param {*} pRecordId 
     * @param {*} pCurrentUserId 
     */
    this.runAsyncEvent = function (pScriptName, pRecordId, pCurrentUserId) {
        var parameters = aa.util.newHashMap();
        if (pCurrentUserId == null) {
            pCurrentUserId = currentUserID;
        }
        parameters.put("recordId", pRecordId);
        parameters.put("AsyncScriptName", pScriptName);
        parameters.put("currentUserID", pCurrentUserId);

        aa.runAsyncScript("EVENT_FOR_ASYNC", parameters);
    }

    /**
     * POST JSON AND GET INFO BACK
     * @param {string} url URL of endpoint
     * @param {Object} postObj Must be javscript object capable of JSON.parse();
     * @returns {Object} returns 
     */
    this.httpPostJsonToService = function (url, postObj, apikey) {
        var map = aa.httpClient.initPostParameters();
        resp = {};
        map.put("Content-Type", "application/json");
        if (apikey != "") {
            map.put("X-API-Key", apikey);
        }
        var contents = JSON.stringify(postObj);

        logDebug("******************");
        logDebug("POST: " + url);
        logDebug("Contents: " + contents);
        logDebug("******************");

        //return { success: true, message:"TEST MODE" }; 
        var resp = aa.httpClient.post(url, map, contents);
        if (resp.getSuccess()) {
            respString = String(resp.getOutput());
            logDebug("Response: " + respString);
            try {
                resp = JSON.parse(respString);
            }
            catch (err) {
                logDebug("Failed to parse JSON " + err.message);
                return { success: false, message: "Failed to parse JSON " + err.message };
            }
        }
        else {
            logDebug("Failed to post " + resp.getErrorMessage());
            return { success: false, message: "Failed to post " + resp.getErrorMessage() };
        }
        return { success: true, message: String(resp) };
    }

    this.generateReportSavetoEDMS = function (itemCap, reportName, module, parameters, userName) {
        //returns the report file which can be attached to an email.
        var user = "";
        if (!userName) {
            user = currentUserID; // Setting the User Name
        }
        else {
            user = userName; // Setting the User Name
        }
        var report = aa.reportManager.getReportInfoModelByName(reportName);
        report = report.getOutput();
        report.setModule(module);
        //report.setCapId(itemCap);
        report.setReportParameters(parameters);
        report.setCapId(itemCap.getID1() + "-" + itemCap.getID2() + "-" + itemCap.getID3());
        report.getEDMSEntityIdModel().setAltId(itemCap.getCustomID());

        var permit = aa.reportManager.hasPermission(reportName, user);
        if (permit.getOutput().booleanValue()) {
            var reportResult = aa.reportManager.getReportResult(report);
            if (!reportResult.getSuccess()) {
                aa.print("System failed get report: " + reportResult.getErrorType() + ":" + reportResult.getErrorMessage());
                return false;
            } else {
                var reportOutput = reportResult.getOutput();
                aa.print("Report " + reportName + " generated for record " + itemCap.getCustomID());
                return reportOutput;
            }
        } else {
            aa.print("Permissions are not set for report " + reportName + ".");
            return false;
        }
    }


    this.gqHttpClient = function (url, method, apiKey, obj) {
        var responseObj = {};
        responseObj.body = "";
        responseObj.code = 404;
        try {
            var httpMethod = method ? method : "GET";
            logDebug("Url: " + url);
            if (httpMethod != "GET" && httpMethod != "POST") {
                throw new Error("Unsupported method so far");
            }
            var headers = aa.httpClient.initPostParameters();
            headers.put("Accept-Charset", "UTF-8");
            headers.put("Content-Type", "application/json");
            headers.put("X-API-Key", String(apiKey));
            logDebug(headers);
            var response = null;
            if (httpMethod == "GET") {
                response = aa.httpClient.get(url, headers);
            }
            else if (httpMethod == "POST") {
                response = aa.httpClient.post(url, headers, JSON.stringify(obj))
            }

            if (response.getSuccess()) {
                var data = response.getOutput();
                data = JSON.parse(data);
                responseObj.body = data;
                responseObj.code = 200;
                return responseObj;
            } else {
                throw new Error("Error with request: " + response.getErrorType() + " " + response.getErrorMessage());
            }
        } catch (err) {
            logDebug("Error with gqHttpClient: " + err + " " + err.lineNumber);
        }
        return responseObj;
    }

    this.gqGetACAUrl = function (itemCap, routeId) {

        // returns the path to the record on ACA.  Needs to be appended to the site    
        var enableCustomWrapper = lookup("ACA_CONFIGS", "ENABLE_CUSTOMIZATION_PER_PAGE");
        var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
        acaUrl = acaUrl.substr(0, acaUrl.toUpperCase().indexOf("/ADMIN"));
        var id1 = itemCap.getID1();
        var id2 = itemCap.getID2();
        var id3 = itemCap.getID3();
        var itemCapModel = aa.cap.getCap(itemCap).getOutput().getCapModel();
        if (!routeId) {
            routeId = "1000";
        }
        acaUrl += "/urlrouting.ashx?type=" + routeId;
        acaUrl += "&Module=" + itemCapModel.getModuleName();
        acaUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
        acaUrl += "&agencyCode=" + aa.getServiceProviderCode();
        if (matches(enableCustomWrapper, "Yes", "YES"))
            acaUrl += "&FromACA=Y";

        return acaUrl;
    }

    this.gqHtmlEncode = function (str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /**
     * gqRunUrlGetFile2Disk - Gets file from Gwiz and saves to disk local to Accela Server.
     * @param {string} gwizFileName - File name for Gwiz
     * @param {string} accelaModule - Optional - Accela Module, must have permissions to GwizGetFiles
     * @returns - File path to document
     */
    this.gqRunUrlGetFile2Disk = function (gwizFileName, accelaModule) {

        if (accelaModule == null) {
            if (capId != null) {
                GQ_DEFAULT_MODULE = aa.cap.getCap(capId).getOutput().getCapModel().getModuleName();
                logDebug("Got Accela Module from CapId " + GQ_DEFAULT_MODULE);
            }
            else {
                var GQ_DEFAULT_MODULE = lookup("GRAYQUARTER", "WIZARD_DEFAULT_MODULE");
                if (!GQ_DEFAULT_MODULE || GQ_DEFAULT_MODULE == "") {
                    logDebug("GRAYQUARTER WIZARD_DEFAULT_MODULE field not configured in bizdomain. Default Building");
                    GQ_DEFAULT_MODULE = "Building";
                }
                else {
                    logDebug("GQ_DEFAULT_MODULE " + GQ_DEFAULT_MODULE + ". Update Std Choice GRAYQUARTER WIZARD_DEFAULT_MODULE to change");
                }
            }

            accelaModule = GQ_DEFAULT_MODULE;
        }

        reportName = "GwizGetFiles"; //MUST BE PRE-CONFIGURED IN REPORT MANAGER
        report = aa.reportManager.getReportInfoModelByName(reportName);
        report = report.getOutput();
        report.setModule(accelaModule);
        var reportParameters = aa.util.newHashMap();
        var fileName = gwizFileName;
        reportParameters.put("filename", fileName);
        logDebug("Get filename = " + fileName);
        report.setReportParameters(reportParameters);
        var urlReport = aa.reportManager.hasPermission(reportName, currentUserID);

        if (urlReport.getOutput().booleanValue()) {
            var reportResult = aa.reportManager.getReportResult(report);

            if (reportResult) {
                reportResult = reportResult.getOutput();
                var reportFile = aa.reportManager.storeReportToDisk(reportResult);
                logDebug("Report Result: " + reportResult);
                reportFile = reportFile.getOutput();
                logDebug("SUCCESS Report File = " + reportFile);
                return reportFile;
            }
            else {
                logDebug("gqRunUrlGetFile2Disk - Failed to get GwizGetFiles Report Result");
            }
        }
        else {
            logDebug("gqRunUrlGetFile2Disk - Failed to Run Report GwizGetFiles " + urlReport.getErrorMessage());
        }
        return null;
    }

    /**
     * Runs a report with any specified parameters and attaches it to the record
     *
     * @example
     *		runReportAttach(capId,"ReportName","altid",capId.getCustomID(),"months","12");
     *		runReportAttach(capId,"ReportName",paramHashtable);
     * @param capId
     *			itemCapId - capId object
     * @param {report parameter pairs} or {hashtable}
     *			optional parameters are report parameter pairs or a parameters hashtable
     * @returns {filename}
     *			if the report was generated and attached return filename
     *
     */
    this.gqRunReportAttach = function (itemCapId, aaReportName, parameters) {
        var reportName = aaReportName;
        reportResult = aa.reportManager.getReportInfoModelByName(reportName);

        if (!reportResult.getSuccess()) {
            logDebug("**WARNING** couldn't load report " + reportName + " " + reportResult.getErrorMessage());
            return false;
        }

        var report = reportResult.getOutput();
        var itemCap = aa.cap.getCap(itemCapId).getOutput();
        itemAppTypeResult = itemCap.getCapType();
        itemAppTypeString = itemAppTypeResult.toString();
        itemAppTypeArray = itemAppTypeString.split("/");

        report.setModule(itemAppTypeArray[0]);
        report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3());
        report.getEDMSEntityIdModel().setAltId(itemCapId.getCustomID());

        report.setReportParameters(parameters);

        var rptUser = gqLookup("GRAYQUARTER", "APIUSER_GRAYQUARTER");
        if (rptUser == "undefined" || rptUser == "" || rptUser == null) {
            rptUser = "ADMIN";
            logDebug("Warning missing GRAYQUARTER.APIUSER_GRAYQUARTER default ADMIN");
        }
        var permit = aa.reportManager.hasPermission(reportName, rptUser);
        if (permit.getOutput().booleanValue()) {
            var reportResult = aa.reportManager.getReportResult(report);
            if (reportResult) {
                logDebug("Report " + aaReportName + " has been run for " + itemCapId.getCustomID());
                return reportResult;
            }
        } else {
            logDebug("No permission to report: " + reportName + " for user: " + "APIUSER_GRAYQUARTER");
            return false;
        }
    }

    //Checks for undefined.
    this.gqScriptNull = function (pval) {
        if (pval == "" || pval == null) {
            return 'undefined'
        }
        return pval;
    }

    this.gqLookup = function (stdChoice, stdValue) {
        var strControl = "";
        var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);

        if (bizDomScriptResult.getSuccess()) {
            var bizDomScriptObj = bizDomScriptResult.getOutput();
            strControl = String(bizDomScriptObj.getDescription()); // had to do this or it bombs.  who knows why?
            logDebug("gqLookup(" + stdChoice + "," + stdValue + ") = " + strControl);
        } else {
            logDebug("gqLookup(" + stdChoice + "," + stdValue + ") does not exist");
        }
        return strControl;
    }

    return this; //end of object
}