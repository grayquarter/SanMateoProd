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

/* master script code don't touch */ aa.env.setValue("EventName", eventName); var vEventName = eventName; var controlString = eventName; var tmpID = aa.cap.getCapID(myCapId).getOutput(); if (tmpID != null) {aa.env.setValue("PermitId1", tmpID.getID1()); aa.env.setValue("PermitId2", tmpID.getID2()); aa.env.setValue("PermitId3", tmpID.getID3());} aa.env.setValue("CurrentUserID", myUserId); var preExecute = "PreExecuteForAfterEvents"; var documentOnly = false; var SCRIPT_VERSION = 3.0; var useSA = false; var SA = null; var SAScript = null; var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE"); if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {useSA = true; SA = bzr.getOutput().getDescription(); bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT"); if (bzr.getSuccess()) {SAScript = bzr.getOutput().getDescription();} } if (SA) {eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductScript));	/* force for script test*/ showDebug = true; eval(getScriptText(SAScript, SA, useProductScript));} else {eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductScript)); eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductScript));} eval(getScriptText("INCLUDES_CUSTOM", null, useProductInclude)); if (documentOnly) {doStandardChoiceActions2(controlString, false, 0); aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed."); aa.abortScript();} var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName); var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS"; var doStdChoices = true; var doScripts = false; var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0; if (bzr) {var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE"); doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I"; var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT"); doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";} function getScriptText(vScriptName, servProvCode, useProductScripts) {if (!servProvCode) servProvCode = aa.getServiceProviderCode(); vScriptName = vScriptName.toUpperCase(); var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput(); try {if (useProductScripts) {var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);} else {var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");} return emseScript.getScriptText() + "";} catch (err) {return "";} } logGlobals(AInfo); if (runEvent && typeof (doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString, true, 0);} catch (err) {logDebug(err.message)} if (runEvent && typeof (doScriptActions) == "function" && doScripts) doScriptActions(); var z = debug.replace(/<BR>/g, "\r"); aa.print(z);
logDebug("---RUNNING TEST CODE")
//
// User code goes here
//
var testSessionId;
// testSessionId = "1a98a00a639248a981210662e103b43f";

if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);
var gq_session = aa.env.getValue("gqinsession_id");
eval(getScriptText("GQ_WIZARD_LIBRARY"))
var sessionObject = gqWizardLoadSession(gq_session);
var formData = sessionObject.formData;
var sessionData = sessionObject.sessionData;

try {
    var recordTypes = formData.recordTypes;
    logDebug("Record Types: " + recordTypes);
    // var recordTypes;
    if (!recordTypes) {
        recordTypes = ["Building/Commercial/New/NA"];
    }
    recordTypes = recordTypes.split(",");
    var recordInfoList = [];
    for (var i in recordTypes) {
        var recordType = recordTypes[i];
        var templateId = 0;

        var match = recordType.match(/^(.*)\[(\d+)\]$/);
        if (match) {
            logDebug("match: " +match);
            recordType = match[1]; // Extracted recordType
            templateId = parseInt(match[2], 10); // Extracted and parsed templateId
        }

        logDebug("Record Type: " + recordType);
        logDebug("Template ID: " + templateId);

        var capId = createTempRecord(recordType);
        var cap = aa.cap.getCap(capId).getOutput();
        var appAlias = cap.capModel.appTypeAlias;
        var acaUrl = gqGetACAUrl(capId, 1005);
        var feeTable = getFeeTable(capId);
        // var dprRequirements = getNeededRecords(recordType);
        var dprRequirements = "";
        if (!dprRequirements) {
            dprRequirements = "None";
        }

        var recordData = {
            recordType: String(recordType),
            templateId: templateId,
            altId: String(capId.getCustomID()),
            appAlias: String(appAlias),
            acaUrl: acaUrl,
            feeEstimate: feeTable,
            dprRequirements: dprRequirements
        };
        // logDebug(JSON.stringify(recordData));
        recordInfoList.push(recordData);
        continue;
        //  Add transactional address to the record
        addTransactionalAddressFromFormData(capId, formData);
        // Add transactional parcel to the record
        addRandomParcel(capId);
        // Add transactional owner to the record
        addRandomOwner(capId, formData);
        // Add session number to record.
        addSessionToRecordQUDs(capId, gq_session);
        // Associate Public User to the new Temp record
        var gqpublicUser = formData.publicUserID
        if (!gqpublicUser) gqpublicUser = "marshalltbrown";
        if (!!gqpublicUser) {
            var contactSuccess = addPublicUserToRecordAsContact(gqpublicUser, capId, "Applicant");
            logDebug("Attempt to add contact to record: " + contactSuccess);
        } else {
            logDebug("publicUserID not found. Skipping public user creation step.");
        }
    }
    logDebug("Record HTML: " + JSON.stringify(recordInfoList));
    aa.env.setValue("gwiz_record_html", JSON.stringify(recordInfoList));
}
catch (err) {
    logDebug(err)
}


// end user code
logDebug("---END OF TEST CODE")
if (testSessionId) {aa.env.setValue("ScriptReturnCode", "0"); aa.env.setValue("ScriptReturnMessage", debug);}

//Custom Functions
// function getGeneralContent(capId) {
//     var capModel = aa.cap.getCapViewBySingle4ACA(capId);
//     var capType = capModel.getCapType();
//     var templateString = "gwiz_" + capType;
//     logDebug("Template String: " + templateString);
//     var template_Result = aa.communication.getNotificationTemplate(templateString);
//     if (!template_Result.getSuccess() || !template_Result.getOutput()) return "";
//     var template = template_Result.getOutput();
//     if (!template.emailTemplateModel || !template.emailTemplateModel.contentText) return "";
//     return template.emailTemplateModel.contentText;
// }
function getFeeTable(capId) {
    var feeItems = getEstimatedFees(capId);
    var feeEstimate = {};
    feeEstimate.total = 0;
    feeEstimate.feeItems = feeItems;
    for (var i = 0; i < feeItems.length; i++) {
        var item = feeItems[i];
        feeEstimate.total += parseInt(item.due, 10);
    }
    return feeEstimate;
}


function addTransactionalAddressFromFormData(pcapId, formData) {
    try {

        var addressModel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.AddressModel").getOutput();
        // logDebug("addressModel: " + addressModel);
        // explore(addressModel)

        var city = formData.esri_City;
        var country = formData.esri_CountryCode;
        var state = formData.esri_RegionAbbr;
        var zip = formData.esri_Postal;
        var address = formData.esri_Address;
        var houseNumber = formData.esri_AddNum;
        var streetName = processAddress(formData);
        var suffix = getLastSegment(formData);
        addressModel.setAddressLine1(address);
        addressModel.houseNumberStart = houseNumber;
        addressModel.streetName = streetName;
        addressModel.streetSuffix = suffix;
        addressModel.setCity(city);
        addressModel.setState(state);
        addressModel.setZip(zip);
        addressModel.capID = pcapId;
        addressModel.countryCode = "US";
        addressModel.auditID = "ADMIN";
        addressModel.primaryFlag = "Y";
        addressModel.serviceProviderCode = aa.getServiceProviderCode();
        addressModel.fullAddress = address + " " + city + ", " + state + " " + zip;
        var newAddress_Result = aa.address.createAddress(addressModel);
        if (!newAddress_Result.getSuccess()) {
            logDebug("ERROR: " + newAddress_Result.getErrorMessage());
        } else {
            logDebug("New Address added: " + newAddress_Result.getSuccess());
        }
    } catch (err) {
        logDebug("No Address Found");
    }
    function getLastSegment(formData) {
        // Ensure formData has the necessary property
        if (!formData || !formData.esri_Address) {
            return 'Rd'; // or handle the error as needed
        }

        // Step 1: Find the last index of the space character
        var lastIndex = formData.esri_Address.lastIndexOf(' ');

        // Step 2: Retrieve everything after the last space character
        if (lastIndex !== -1) {
            return formData.esri_Address.substring(lastIndex + 1);
        } else {
            return "Rd"; // No space found, return the entire address
        }
    }


    function processAddress(formData) {
        // Ensure formData has the necessary properties
        if (!formData || !formData.esri_Address || !formData.esri_AddNum) {
            return ''; // or handle the error as needed
        }

        // Step 1: Remove esri_AddNum from the front of esri_Address
        var address = formData.esri_Address;
        if (address.indexOf(formData.esri_AddNum) != -1) {
            address = address.replace(formData.esri_AddNum + " ", '');
        }
        // Step 2: Find the last index of the space character
        var lastIndex = address.lastIndexOf(' ');

        // Step 3: Remove everything from the last space character onwards
        if (lastIndex !== -1) {
            address = address.substring(0, lastIndex);
        }

        return address;
    }
}

function addSessionToRecordQUDs(pcapId, sessionStr) {
    var newCap = aa.cap.getCap(pcapId).getOutput();
    var newCapModel = newCap.getCapModel();
    var gq_session_1 = sessionStr.substring(0, 16);
    var gq_session_2 = sessionStr.substring(16);
    newCapModel.setQUD1(String(gq_session_1));
    newCapModel.setQUD2(String(gq_session_2));

    var addSession_Result = aa.cap.editCapByPK(newCapModel);
    logDebug("Added session #" + gq_session + " to record: " + addSession_Result.getSuccess());
}

function createTempRecord(recordType) {
    var recordTypeArray = recordType.split("/");
    var ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();
    ctm.setGroup(recordTypeArray[0]);
    ctm.setType(recordTypeArray[1]);
    ctm.setSubType(recordTypeArray[2]);
    ctm.setCategory(recordTypeArray[3]);
    //ctm.setSearchableInACA("Y");
    var temp_capId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE EST");
    if (temp_capId.getSuccess()) {
        logDebug("New Temp Record: " + temp_capId.getOutput().customID);
        return temp_capId.getOutput();
    } else {
        logDebug("Error creating temp record.");
        return null;
    }
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
    var createResult = aa.people.createCapContactWithAttribute(capContactModel);
    if (!createResult.getSuccess()) {
        logDebug("addPublicUserToRecordAsContact: createCapContact Failed " + createResult.getErrorMessage());
        return false;
    }
    return true;

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
}

// Main record lookup function
function getNeededRecords(recordType) {

    var requirementHtmlItemEnd = "</div>";
    var requirementsHtmlEnding = "</div>" + "</div>" + "</div>" + "</div>";

    var requirementsHtmlBeginning =
        '<div class="dpr-submittal-checklist-panel" style="display: block;"> <div> ' +
        '<div class="dpr-checklist-panel-heading"><span>Document Submission Requirements</span></div> ' +
        '<div class="dpr-panel-body"> ' +
        '<div class="dpr-checklist-border"></div> ' +
        '<div class="dpr-reqs-list fancybar" style="display: block;"> ';
    var requirementHtmlItemBeginning =
        '<div class="border-bottom border-2 py-2 mt-0">';

    var debug = "";
    try {
        if (recordType) {
            var headers = aa.util.newHashMap();
            headers.put("Content-Type", "application/json");
            var body = {};
            body.type = recordType;

            var apiURL = lookup("DPR_CONFIGS", "ENDPOINT") + "/projects/types/checklist";

            var requirements = aa.httpClient.post(apiURL, headers, JSON.stringify(body));
            if (!requirements.getSuccess()) {
                logDebug("EPH error: " + requirements.getErrorMessage());
                return;
            }
            requirements = JSON.parse(requirements.getOutput());

            // logDebug("EPH Output: " + result.getOutput());
            if (requirements.length) {
                requirements.sort(function (a, b) {
                    if (a.actionType === b.actionType) {
                        return a.description < b.description ? -1 : 1;
                    } else {
                        return a.actionType === "required" ? -1 : b.actionType === "required" ? 1 : a.actionType === "warning" ? -1 : 1;
                    }
                });
                var requirementsHtml = requirementsHtmlBeginning;
                for (var index in requirements) {
                    var element = requirements[index];
                    // requirements.forEach((element) => {
                    var actionType = "";
                    var actionIcon = "";
                    switch (element.actionType) {
                        case "required":
                            actionType = "danger";
                            actionIcon = "ban";
                            break;
                        case "warning":
                            actionType = "warning";
                            actionIcon = "exclamation";
                            break;
                        case "info":
                            actionType = "info";
                            actionIcon = "info";
                            break;
                    }
                    var reference = "";
                    if (element.reference) {
                        reference = "<span class=\"badge rounded-pill bg-secondary ms-auto\"><a class=\"dpr-req-link\" href=\"" + element.reference + "\" target=\"_blank\" title=\"Click for reference\"><i class=\"fas fa-link font-13\"></i></a></span>";
                    }
                    requirementsHtml += requirementHtmlItemBeginning;
                    requirementsHtml += "<div class=\"flex align-items-center\">" +
                        "<i class=\"fa fa-" + actionIcon + " dpr-checklist-label-" + actionType + " fs-5\" aria-hidden=\"true\"></i>" +
                        "<span class=\"px-2 fw-bold dpr-req-label\" id=\"" + element.description + "\">" + element.description + "</span>" +
                        reference +
                        "</div>";
                    if (element.message) {
                        requirementsHtml += "<div>" +
                            "<div class=\"dpr-requirements-arrow-up dpr-requirements-arrow-up-" + actionType + " ms-4 mt-1\"></div>" +
                            "<div class=\"bg-light-" + actionType + "\">" +
                            "<span class=\"dpr-submittal-checklist-error-msg p-2\">" + element.message + "</span>" +
                            "</div>" +
                            "</div>";
                    }
                    requirementsHtml += requirementHtmlItemEnd;
                };
                requirementsHtml += requirementsHtmlEnding;
                // $("div.dpr-requirements").first().html(requirementsHtml);
                return requirementsHtml;
            }
        } else {
            logDebug("no record type is g-gwiz session");
        }
    } catch (err) {
        logDebug(err);
        aa.env.setValue("debug", debug + ":" + err.message + " stack" + err.stack);
    }
}

function addRandomParcel(pcapId) {

    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digits = "0123456789";
    var parcelNo = "";

    // Generate three random letters
    for (var i = 0; i < 3; i++) {
        var randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        parcelNo += randomLetter;
    }

    // Generate seven random digits
    for (var i = 0; i < 7; i++) {
        var randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
        parcelNo += randomDigit;
    }
    //   logDebug("Parcel Number: " + parcelNo);

    // Create a new ParcelModel object
    var parcelModel = aa.parcel.getCapParcelModel().getOutput();


    // Set the attributes of the new parcel
    parcelModel.parcelNo = parcelNo;
    parcelModel.capIDModel = pcapId;
    parcelModel.parcelNumber = parcelNo;
    var lot = "";
    for (var i = 0; i < 4; i++) {
        var randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
        lot += randomDigit;
    }
    parcelModel.lot = lot;

    // Update the record with the new parcel
    var capModelResult = aa.parcel.createCapParcel(parcelModel);
    if (capModelResult.getSuccess()) {
        logDebug("Parcel added successfully");
    } else {
        logDebug("Error adding parcel: " + capModelResult.getErrorMessage());
    }
}

function addRandomOwner(pcapId, formData) {
    var firstNames = ["Arnold", "Barry", "Cindy", "David", "Ethan", "Frank", "Gina", "Hank", "Irene", "John", "Kathy", "Larry", "Mary", "Nancy", "Oscar", "Pam", "Quinn", "Randy", "Sally", "Tom", "Ursula", "Victor", "Wendy", "Xavier", "Yolanda", "Zach"];
    var lastNames = ["Adams", "Baker", "Carter", "Davis", "Edwards", "Foster", "Garcia", "Harris", "Ingram", "Johnson", "King", "Lee", "Miller", "Nelson", "Owens", "Perez", "Quinn", "Roberts", "Smith", "Taylor", "Underwood", "Vargas", "Ward", "Young", "Zimmerman"];
    var ownerString = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)] + " & " + firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
    ownerString = ownerString.toUpperCase();

    var ownerModel = aa.owner.getCapOwnerScriptModel().getOutput();
    ownerModel.mailState = formData.attr_state;
    ownerModel.mailZip = formData.attr_zip;
    ownerModel.mailCity = formData.attr_city;
    ownerModel.mailAddress1 = formData.attr_address;
    ownerModel.ownerFullName = ownerString;
    ownerModel.mailCountry = "US";
    ownerModel.capID = pcapId;
    ownerModel.setPrimaryOwner("Y");
    var owner_Result = aa.owner.createCapOwnerWithAPOAttribute(ownerModel);
    if (owner_Result.getSuccess()) {
        logDebug("Owner added successfully");
    } else {
        logDebug("Error adding owner: " + owner_Result.getErrorMessage());
    }
    // props(ownerModel);
}

function getEstimatedFees(pcapId) {
    var estimatorScript = getScriptText("GWIZ_ESTIMATE_FEES");
    estimatorScript = estimatorScript.replace("$$ALTID$$", pcapId.getCustomID());
    var service = com.accela.aa.emse.dom.service.CachedService.getInstance().getEMSEService();
    var htResult = service.testScript(estimatorScript, aa.getServiceProviderCode(), aa.util.newHashtable(), 'ADMIN', false);
    var fees = JSON.parse(htResult.get("gq_fees"));
    for (var i in fees) {
        // Remove the fee
        var fee = aa.fee.getFeeItemByPK(pcapId, fees[i].sequence).getOutput();
        var result = aa.finance.removeFeeItem(fee.f4FeeItem);
        if (!result.getSuccess()) {
            logDebug("Error removing fee: " + result.getErrorMessage());
        }
    }
    return fees;
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

/**
 * 
 * @param {String} parcelNumber Parcel Number 
 * @param {CapIDModel} itemCapID The capId of the record to add the APO to 
 * @param {String} houseNo OPTIONAL - In case of multiple addresses on the parcel, The house number to use to find the address. Otherwise, the first address will be used.
 * @returns {void} No return but will output results to the log
 */
function addAPOByParcelNum(parcelNumber, itemCapID, houseNo) {

    // Get parcel
    var amodel = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.RefAddressModel").getOutput();
    var primaryParcel = aa.parcel.getParceListForAdmin(parcelNumber, null, null, null, null, null, null, null, null, null).getOutput()[0].getParcelModel();
    var capParModel = aa.parcel.warpCapIdParcelModel2CapParcelModel(itemCapID, primaryParcel).getOutput();
    var createPMResult = aa.parcel.createCapParcel(capParModel);
    logDebug("Created CAP Parcel: " + createPMResult.getSuccess());
    // Address
    var refDAO = aa.proxyInvoker.newInstance("com.accela.aa.aamain.address.RefAddressDAOOracle").getOutput();
    var addresses = refDAO.getRefAddressByParcelNbrs(aa.getServiceProviderCode(), [primaryParcel]);
    if (addresses && addresses.toArray && addresses.toArray().length != 0) {
        addresses = addresses.toArray();
        var primaryAddress;
        if (houseNo) {
            addresses.forEach(function (address) {
                if (address.houseNumberStart == houseNo) {
                    primaryAddress = address;
                }
            });
        }
        if (!primaryAddress) {
            logDebug("No address found with house number " + houseNo);
            primaryAddress = addresses[0];
        }
        var addressModel = primaryAddress.toAddressModel();
        addressModel.setCapID(itemCapID);
        addressModel.setServiceProviderCode(aa.getServiceProviderCode());
        addressModel.setAuditID("ADMIN");
        addressModel.setPrimaryFlag("Y");
        addressModel.setAuditStatus("A");
        var addrResult = aa.address.createAddressWithAPOAttribute(itemCapID, addressModel);
        logDebug("Created CAP Address: " + addrResult.getSuccess());
        
    }
    // Owner -- Uses primaryParcel
    var parcelListResult = aa.parcel.getParcelDailyByCapID(itemCapID, null).getOutput();
    if (parcelListResult && parcelListResult.length > 0) {
        var primParcel = parcelListResult[0];
        var ownerListResult = aa.owner.getOwnersByParcel(primParcel).getOutput();
        if (ownerListResult && ownerListResult.length > 0) {
            var primOwner = ownerListResult[0];
            primOwner.setCapID(itemCapID);
            var createOResult = aa.owner.createCapOwnerWithAPOAttribute(primOwner);
            logDebug("Created CAP Owner: " + createOResult.getSuccess());
        }
    }
}
