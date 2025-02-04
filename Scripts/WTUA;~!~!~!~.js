//WTUA:*/*/*/*
//RUNS DOCUSIGN TEST
if(wfTask == "GQ Sign Test" && wfStatus == "Send Test to Applicant"){
    include("GQ_DOCUSIGN_LIBRARY");

    //2. Configure GrayQuarter Signing Options
    var grayquarterSignOptions = {
        "GQ_DOCUSIGN_GEN_REPORT": {
            "ReportInfo":
            {
                "ReportName": "DocusignTest",
                "ReportModule": "Building",
                "Parameters": [
                    { "Parameter1": String(capIDString) }
                ]
            }
        },
        "GQ_DOCUSIGN_SEND_REPORT": {
            "SleepTime": 30000,  //milliseconds to sleep to wait for report to create
            "ContactType": "Applicant", //Contact to send to, must be an individual with first/last name and email
            "SendDocumentType": "Document Unsigned", //Document type to look for in docments tab that will be send
            "ReturnDocumentType": "Document Signed", //Document type that signed document will be uploaded to
            "WorkflowTaskName": "GQ Sign Test",  //Workflow task that will be updated if document successfully sent
            "WorkflowSuccessStatus": "Awaiting Signature", //Workflow status that will be set if successfully sent
            "WorkflowFailStatus": "Signature Error" //Workflow status that will be set if failure, failure will be in comments
        }
    }
    
    
    //3. This function will invoke the sign processing.
    gq.docusign.GqRunReportAndSign(grayquarterSignOptions);
}