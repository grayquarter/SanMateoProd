/* 
GQ_DOCUSIGN_SEND_REPORT.js
Author: Gray Quarter Inc. (c)2024
Usage: Called from Async Script.  This script setups the docusign envelope and sends it.
    The script will update a workflow task with the results of the docusign.
    Report must be configured with tokens available to add the signer, date, and siganture
    You should not need to edit this code.
    This script is a helper script to make sending single sign documents easily to a contact on the record.
    
    This script can be cloned and modified to make it document specific.
    
Version: 1.1
*/

include("GQ_DOCUSIGN_LIBRARY");

var scriptName = "GQ_DOCUSIGN_SEND_REPORT";
var gqOptions = aa.env.getValue("gqOptions");
var gqOptions = JSON.parse(gqOptions);
aa.sleep(gqOptions[scriptName]["SleepTime"]);

var gqInterfaceOrganization = String(lookup("INTERFACE_DOCUSIGN", "DEFAULT_ORGANIZATION"));
var holder = getContactObj(capId, gqOptions[scriptName]["ContactType"] );
if (holder && holder.people.getEmail()) {
    //Create our Signer
    var signer1 = gq.docusign.dsSignerObj();
    var fullName = String(holder.people.getFirstName() + " " + holder.people.getLastName());
    //optional where to inject the signature block, does a text search of document
    signer1.AddSignHere("/sn1/");
    signer1.FullName = fullName;
    signer1.AddFullNameHere("/fn1/");
    signer1.Email = String(holder.people.getEmail());
    signer1.AddDateHere("/dt1/");
    //load envelope
    var env = gq.docusign.doDocusign(gqInterfaceOrganization, capId, gqOptions[scriptName]["ReturnDocumentType"], null, null, null);
    //Add document to the envelope
    env.AddDocumentType(gqOptions[scriptName]["SendDocumentType"]); //document Cateogry, grabs first one
    //Add signer to the envelope
    env.AddSigner(signer1); //adds the signer can do multiple
    var sendResults = env.Send();
    if(sendResults.success){
        //UPDATE WORKFLOW STATUS WITH SUCCESS
        var envelopeId = sendResults.message;
        updateTask(gqOptions[scriptName]["WorkflowTaskName"]
         ,gqOptions[scriptName]["WorkflowSuccessStatus"],"Script - DocuSign sent to applicant.", "");
    }
    else{
        //UPDATE WORKFLOW STATUS WITH FAILURE MESSAGE
        updateTask(gqOptions[scriptName]["WorkflowTaskName"]
         ,gqOptions[scriptName]["WorkflowFailStatus"]
         ,"Script - DocuSign could not be sent, please review.", "");
    }
}
else{
    //UPDATE WORKFLOW WITH FAILED TO SEND MISSING EMAIL
    updateTask(gqOptions[scriptName]["WorkflowTaskName"]
     ,gqOptions[scriptName]["WorkflowFailStatus"]
     ,"Script - DocuSign could not be sent, missing applicant email.", "");
}