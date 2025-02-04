var myCapId = "";
var myUserId = "ADMIN";
var eventName = "";

/* TEST  */  var eventName = "SCRIPT_TEST";
/* CTRCA */  //var eventName = "ConvertToRealCapAfter";
/* ASA   */  //var eventName = "ApplicationSubmitAfter";
/* ASIUA */  //var eventName = "ApplicationSubmitAfter";
/* WTUA  */  //var eventName = "WorkflowTaskUpdateAfter";  wfTask = "License Issuance"; wfProcess = "XX"; wfComment = "XX";  wfStatus = "Issued";  wfDateMMDDYYYY = "01/27/2015";
/* IRSA  */  //var eventName = "InspectionResultSubmitAfter"; inspId=0;  inspType="Roofing"; inspResult="Failed"; inspResultComment = "Comment"; 
/* ISA   */  //var eventName = "InspectionScheduleAfter"; inspType = "Roofing";
/* PRA   */  //var eventName = "PaymentReceiveAfter";

var useProductInclude = true; //  set to true to use the "productized" include file (events->custom script), false to use scripts from (events->scripts)
var useProductScript = true;  // set to true to use the "productized" master scripts (events->master scripts), false to use scripts from (events->scripts)
var runEvent = true; // set to true to simulate the event and run all std choices/scripts for the record type.

/* master script code don't touch */ aa.env.setValue("EventName", eventName); var vEventName = eventName; var controlString = eventName; var tmpID = aa.cap.getCapID(myCapId).getOutput(); if (tmpID != null) { aa.env.setValue("PermitId1", tmpID.getID1()); aa.env.setValue("PermitId2", tmpID.getID2()); aa.env.setValue("PermitId3", tmpID.getID3()); } aa.env.setValue("CurrentUserID", myUserId); var preExecute = "PreExecuteForAfterEvents"; var documentOnly = false; var SCRIPT_VERSION = 3.0; var useSA = false; var SA = null; var SAScript = null; var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") { useSA = true; SA = bzr.getOutput().getDescription(); bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT"); if (bzr.getSuccess()) { SAScript = bzr.getOutput().getDescription(); } } if (SA) { eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductScript)); /* force for script test*/ showDebug = true; eval(getScriptText(SAScript, SA, useProductScript)); } else { eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductScript)); } eval(getScriptText("INCLUDES_CUSTOM", null, useProductInclude)); if (documentOnly) { doStandardChoiceActions2(controlString, false, 0); aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed."); aa.abortScript(); } var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName); var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS"; var doStdChoices = true; var doScripts = false; var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0; if (bzr) { var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE"); doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT"); doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; } function getScriptText(vScriptName, servProvCode, useProductScripts) { if (!servProvCode) servProvCode = aa.getServiceProviderCode(); vScriptName = vScriptName.toUpperCase(); var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput(); try { if (useProductScripts) { var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName); } else { var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN"); } return emseScript.getScriptText() + ""; } catch (err) { return ""; } } logGlobals(AInfo); if (runEvent && typeof (doStandardChoiceActions) == "function" && doStdChoices) try { doStandardChoiceActions(controlString, true, 0); } catch (err) { logDebug(err.message) } if (runEvent && typeof (doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g, "\r"); aa.print(z);
logDebug("---RUNNING TEST CODE")
//
// User code goes here
//
var testSessionId;
// testSessionId = "b86d576960f84fcc9fbd546ed753b697";

if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
// aa.print(getScriptText("GQ_WIZARD_LIBRARY"));
eval(getScriptText("GQ_WIZARD_LIBRARY"))
var sessionObject = gqWizardLoadSession(gq_session);
var formData = sessionObject.formData;
var sessionData = sessionObject.sessionData;

try {
    var reporter = "Anonymous";
    if (formData.firstName && formData.lastName) {
        reporter = formData.firstName + " " + formData.lastName + "";
    }


    /*
        1. Map GWIZ variable enforcementType to proper record 4 level structure
        2. If no mapping in matrix default to Enforcement/Incident/General Request/NA
    */
    var recordTypeChosen = formData.recordTypeDescription;
    var fourLevelType = formData.recordType;
    var fourLevelArray = fourLevelType.split("/");
    logDebug("Record chosen: " + fourLevelType);
    logDebug("Four Level creating: " + fourLevelType);
    var cResult = aa.cap.createApp(fourLevelArray[0], fourLevelArray[1], fourLevelArray[2], fourLevelArray[3], recordTypeChosen);

    var capId = cResult.getOutput();
    aa.print("created comment record, success? " + cResult.getSuccess() + " record:" + capId.getCustomID());
    var capModel = aa.cap.newCapScriptModel().getOutput();
    var capDetailModel = capModel.getCapModel().getCapDetailModel();
    capDetailModel.setCapID(capId);
    aa.cap.createCapDetail(capDetailModel);
    // refresh capid
    capId = aa.cap.getCapID(capId.getID1(), capId.getID2(), capId.getID3()).getOutput();
    //var capModel = aa.cap.getCap(capId).getOutput();


    if (!capId) {
        throw "do not have a report record"
    }

    // Add altID to session
    logDebug("New Temp Record: " + capId.getCustomID());
    aa.env.setValue("appid", String(capId.getCustomID()));

    // Get the contact from the public user and add the contact to the record.
    var userEmail = formData.user_email;
    if (userEmail) {
        // Get Public User
        var myUser = aa.publicUser.getPublicUserByEmail(userEmail);
        if (myUser.getSuccess() && myUser.getOutput()) {
            // Either .userID or .auditID
            var gqpublicUser = myUser.getOutput().userID;
            logDebug("gqpublicUser: " + gqpublicUser);
            if (!!gqpublicUser && capId) {
                logDebug("Adding contact to record.")
                var contactSuccess = addPublicUserToRecordAsContact(gqpublicUser, capId, "Applicant");
                logDebug("Attempt to add contact to record: " + contactSuccess);
            } else {
                logDebug("publicUserID not found. Skipping public user creation step.");
            }
        }
    }
    var deeplink = gqGetACAUrl(capId, "1000");
    aa.env.setValue("deeplink", deeplink);

    //Create description on record.
    createWorkDescription(capId, formData.OtherDetailsLocation);

    //populate the address field on record.
    populateAddressOffCoords(capId, formData.esri_longitude, formData.esri_latitude);

    //populate asi
    var asiFields = [
        "Source of Complaint",
        "Detailed Description",
        "Type of Submittal",
        "Notify Complainant",
        "Nearest Cross Street",
        "Nearest Street Name",
        "Latitude",
        "Longitude",
    ];

    //var response = a.OnlineResponse.equals("Yes") ? "Y" : "N";
    var asiValues = [
        "Citizen",
        formData.OtherDetailsLocation,
        "Online",
        "Yes",
        formData.nearestCrossStreet,
        formData.esri_Match_addr,
        formData.esri_latitude,
        formData.esri_longitude,
    ]

    for (var i in asiFields) {
        var field = asiFields[i];
        var value = asiValues[i];
        //aa.print(field + ": " + value)
        editAppSpecific(field, value, capId);
        //editAppSpecific(field)
    }
    //
    if (formData.specific && formData.specific.length > 0) {
        var oldNotes = getShortNotes(capId);
        aa.print("Old notes: " + oldNotes)
        updateShortNotes(formData.specific, capId)
    }

    //Populate contact if given a contact
    aa.print("Finished ASI's checking if contact needs to be made.")
    if ("Yes".equals(formData.OnlineResponse) && formData.email && formData.email.length > 0) {
        //a.email
        aa.print("Begin making contact.")
        var people = aa.publicUser.getPublicUserByEmail(formData.email)
        //explore(people)
        if (people.getSuccess()) {
            people = people.getOutput();
            if (people) {
                var userSeq = parseInt(people.getUserSeqNum());
                var refId = null;
                var contactListResult = aa.people.getUserAssociatedContact(userSeq);
                if (contactListResult.getSuccess()) {
                    var contactList = contactListResult.getOutput().toArray();
                    for (var i in contactList) {
                        //aa.print("Found associated contact " + contactList[i].firstName);
                        var contactModel = contactList[i];
                        refId = contactModel.getContactSeqNumber()
                        if (refId) {
                            aa.print("Found refId: " + refId)
                            break;
                        }
                    }
                    //Sometimes there is no account owner, just take the first
                } else {
                    aa.print("Failed to find contacts for public user. Error was: " + contactListResult.getErrorMessage());
                }
            }
            //var check = aa.licenseScript.getPublicUserByUserName(people.getUserID())
            //explore(check)
            // aa.print(refId)
            // aa.print("type refId: " + typeof refId)
            //create the contact
            var c = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.CapContactModel").getOutput();
            var p = aa.people.getPeopleModel();
            p.setServiceProviderCode(aa.getServiceProviderCode());
            p.setFirstName(formData.firstName);
            p.setMiddleName(session); // TODO temporary for report search by session
            p.setLastName(formData.lastName);
            p.setEmail(formData.email);
            p.setFlag("Y")
            //explore(p)
            c.setPeople(p);
            c.setContactType("Reporter");
            c.setCapID(capId);
            if (people && refId) {
                aa.print("Attached ref id: " + refId)
                c.setRefContactNumber(refId);
            }

            var peopleResult = aa.people.createCapContactWithAttribute(c);// set attributes
            if (peopleResult.getSuccess()) {
                //aa.print("Successfuly created cap contact!")
                peopleResult = peopleResult.getOutput();
                var capContactId = null; // need to get the cap contact id
                var capContactResult = aa.people.getCapContactByCapID(capId);
                if (capContactResult.getSuccess()) {
                    var contacts = capContactResult.getOutput();
                    for (var person in contacts) {
                        var p = contacts[person].getCapContactModel().getPeople();
                        if (session.equals(p.getMiddleName())) {
                            aa.print("Created cap contact ID: " + p.getContactSeqNumber());
                            capContactId = String(p.getContactSeqNumber());
                            // aa.print(capContactId)
                            // aa.print("type capContactId: " + typeof capContactId)
                            break;
                        }
                    }
                }
                aa.print("Successfuly made contact.")
            }
        }
    }

    aa.print("Attaching document.")
    //Append document to record
    if (!matches(formData.AttachFile, undefined, null, "")) {
        var url = formData.AttachFile;
        var doc = aa.document.newDocumentModel().getOutput();
        doc.setSourceName("ACCELA");//GQ env
        doc.setUserName("");
        doc.setPassword("");
        doc.setDocGroup("SR");
        doc.setDocCategory("Service Request Attachment");
        doc.setFileName(url.split('/').pop().replace(session + "-", ""));
        doc.setDocDescription(reporter + " session:" + session);
        doc.setDocType("image/jpeg"); // TODO may should probably set dynamically
        doc.setEntityType("CAP");
        var d = createDocumentFromURL(capId, url, doc);
        if (d) {
            aa.print("Successfully appended document, id: " + d.getDocumentNo())
        }
    }
}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
if (testSessionId) { aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug); }

//Custom Functions


//Utility Functions
function createWorkDescription(capId, description) {
    var id = capId.getCustomID();
    var currentModel = aa.cap.getCapWorkDesByPK(capId)
    if (currentModel.getSuccess()) {
        //starts off as script model need to get actual model
        currentModel = currentModel.getOutput().getCapWorkDesModel();
        currentModel.setDescription(description);
        var result = aa.cap.editCapWorkDes(currentModel);
        if (result.getSuccess()) {
            aa.print("Added description: " + description + " to record: " + id)
            return true;
        } else {
            aa.print("Unable to add " + description + " to record: " + id);
            return false;
        }
    } else {
        aa.print("Unable to grab model with id: " + id)
        return false;
    }
}

function populateAddressOffCoords(capId, xCoord, yCoord) {
    //LAT = y = 36
    //LONG = x = -122
    //https://api.opencagedata.com/geocode/v1/json?q=36.033333+-114.983333&key=641c51bed8ab490184632ad8526e29ad&no_annotations=1&language=en
    var header = aa.httpClient.initPostParameters();
    header.put("Content-Type", "application/json");
    var serviceURL = "https://api.opencagedata.com/geocode/v1/json?q=";
    var taco = "a9be2fe0c96f4f05bc519fecfa63c3a8"
    serviceURL += yCoord + "+" + xCoord + "&key=" + taco + "&no_annotations=1&language=en";
    // aa.print(br)
    // aa.print(serviceURL)
    // aa.print(br)
    var vOutObj = aa.httpClient.get(serviceURL, header);
    if (vOutObj.getSuccess()) {
        var data = JSON.parse(vOutObj.getOutput());
        var results = data.results[0].components;
        var fullAddress = data.results[0].formatted;
        var city = results.city;
        var state = results.state_code;
        var street = results.road;
        var zipcode = results.postcode;
        var streetNumber = parseInt(results.house_number);
        aa.print("Street number: " + streetNumber)
        var date = aa.util.parseDate(dateAdd(null, 0));
        var addressModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.AddressModel").getOutput();
        if (city) {
            addressModel.setCity(city);
        }

        if (zipcode) {
            addressModel.setZip(zipcode);
        }

        if (state) {
            addressModel.setState(state);
        }

        if (street) {
            addressModel.setStreetName(street);
        }

        addressModel.setFullAddress(fullAddress);
        addressModel.setXCoordinator(parseFloat(xCoord));
        addressModel.setYCoordinator(parseFloat(yCoord));
        if (streetNumber) {
            addressModel.setHouseNumberStart(streetNumber)
        }

        //WILL FAIL IF THIS STUFF ISN'T SET.
        addressModel.setCapID(capId);
        addressModel.setServiceProviderCode(servProvCode);
        addressModel.setPrimaryFlag("Y")
        addressModel.setAuditID(currentUserID);
        addressModel.setAuditDate(date)

        var success = aa.address.createAddress(addressModel);
        if (success.getSuccess()) {
            aa.print("Successfully added " + fullAddress + " to record: " + capId.getCustomID())
            return fullAddress;
        } else {
            aa.print("Failed to add " + fullAddress + " to record: " + capId.getCustomID());
            return false;
        }
    }
}

function gqGetACAUrl(itemCap, routeId) {

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

function addPublicUserToRecordAsContact(publicUserId, itemCapId, contactType) {
    var getUserResult = aa.publicUser.getPublicUserByUserId(publicUserId);
    if (!getUserResult.getSuccess()) {
        logDebug("addPublicUserToRecordAsContact: could not get public user " + getUserResult.getErrorMessage);
        return false;
    }
    var userModel = getUserResult.getOutput();
    if (!userModel) {
        logDebug("addPublicUserToRecordAsContact: user Model is empty");
        return false;
    }
    var userSeqNum = userModel.getUserSeqNum();
    var refContact = getRefContactForPublicUser(userSeqNum);
    if (!refContact) {
        logDebug("addPublicUserToRecordAsContact: refContact is empty");
        return false;
    }
    var refContactNum = refContact.getContactSeqNumber();
    refContact.setContactAddressList(getRefAddContactList(refContactNum));
    var capContactModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.people.CapContactModel").getOutput();
    capContactModel.setPeople(refContact);
    capContactModel.setSyncFlag("Y");
    capContactModel.setRefContactNumber(refContactNum);
    capContactModel.setContactType(contactType);
    capContactModel.setCapID(itemCapId);
    capContactModel.primaryFlag = "Y";
    capContactModel.people.flag = "Y";
    var createResult = aa.people.createCapContactWithAttribute(capContactModel);
    if (!createResult.getSuccess()) {
        logDebug("addPublicUserToRecordAsContact: createCapContact Failed " + createResult.getErrorMessage());
        return false;
    }
    return true;
}
function getRefAddContactList(peoId) {
    var conAdd = aa.proxyInvoker.newInstance("com.accela.orm.model.address.ContactAddressModel").getOutput();
    conAdd.setEntityID(parseInt(peoId));
    conAdd.setEntityType("CONTACT");
    var addList = aa.address.getContactAddressList(conAdd).getOutput();
    var tmpList = aa.util.newArrayList();
    var pri = true;
    for (x in addList) {
        if (pri) {
            pri = false;
            addList[x].getContactAddressModel().setPrimary("Y");
        }
        tmpList.add(addList[x].getContactAddressModel());
    }

    return tmpList;
}

function getRefContactForPublicUser(userSeqNum) {
    var contractorPeopleBiz = aa.proxyInvoker.newInstance("com.accela.pa.people.ContractorPeopleBusiness").getOutput();
    var userList = aa.util.newArrayList();
    userList.add(userSeqNum);
    var peopleList = contractorPeopleBiz.getContractorPeopleListByUserSeqNBR(aa.getServiceProviderCode(), userList);
    if (peopleList != null) {
        var peopleArray = peopleList.toArray();
        if (peopleArray.length > 0)
            return peopleArray[0];
    }
    return null;
}

function explore(objExplore) {
    logDebug("Methods:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) == "function") {
            logDebug("<font color=blue><u><b>" + x + "</b></u></font> ");
            logDebug("   " + objExplore[x] + "<br>");
        }
    }
    logDebug("");
    logDebug("Properties:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) != "function") logDebug("  <b> " + x + ": </b> " + objExplore[x]);
    }
}

function props(objExplore) {
    logDebug("Properties:")
    aa.print("Properties:")
    for (x in objExplore) {
        if (typeof (objExplore[x]) != "function") {
            logDebug("  <b> " + x + ": </b> " + objExplore[x]);
            aa.print(x + " : " + objExplore[x]);
        }
    }
}