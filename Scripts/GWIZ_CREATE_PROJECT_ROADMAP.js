/* SET TEST SESSION */
var testSessionId;
// testSessionId = "55fc1cb88d954899a387b55b19d1afe6";
if (testSessionId) aa.env.setValue("gqinsession_id", testSessionId);

/* BEGIN MAIN CODE */
try {
    // Load Session
    var gq_session = aa.env.getValue("gqinsession_id");
    eval(getScriptText("GQ_WIZARD_LIBRARY"))
    var sessionObject = gqWizardLoadSession(gq_session);
    var formData = sessionObject.formData;
    var sessionData = sessionObject.sessionData;
    var recordTypes = formData.recordTypes;
    recordTypes = recordTypes.split(",");
    logDebug("Found " + recordTypes.length + " record types.");

    var recordInfoList = [];
    for (var i in recordTypes) {
        var recordType = recordTypes[i];
        var recordTypeFieldValue = "";
        var templateId = 0;

        // Match pattern that can contain both parentheses and brackets
        var matchResult = recordType.match(/^(.*?)(?:\(([^)]+)\))?(?:\[(\d+)\])?(?:\(([^)]+)\))?$/);
        if (matchResult) {
            recordType = matchResult[1]; // Extracted base recordType without parentheses and brackets
            recordTypeFieldValue = matchResult[2] || matchResult[4] || ""; // Extracted field identifier, whether before or after brackets
            templateId = matchResult[3] ? parseInt(matchResult[3], 10) : 0; // Extracted and parsed templateId, if present
        }

        logDebug("Record Type: " + recordType);
        logDebug("Record Field Identifier: " + recordTypeFieldValue);
        logDebug("Template ID: " + templateId);

        var capId = createTempRecord(recordType);
        var cap = aa.cap.getCap(capId).getOutput();
        var appAlias = cap.capModel.appTypeAlias;
        if (recordTypeFieldValue) {
            addRecordTypeIdentifier(capId, recordType, recordTypeFieldValue);
        }
        processGWIZASI(formData, capId);
        var acaUrl = gqGetCustomGWIZUrl(capId, 1005);
        var dprRequirements = getNeededRecords(recordType);
        //var dprRequirements;
        if (!dprRequirements) {
            dprRequirements = "The plan review system does not have any required documents.";
        }
        var feeEstimate = getFeeTable(capId);

        var recordData = {
            recordType: String(recordType),
            templateId: templateId,
            recordTypeFieldValue: String(recordTypeFieldValue),
            altId: String(capId.getCustomID()),
            appAlias: String(appAlias),
            acaUrl: acaUrl,
            dprRequirements: dprRequirements,
            feeEstimate: feeEstimate,
        };
        // logDebug(JSON.stringify(recordData));
        recordInfoList.push(recordData);

        // Add session number to record.
        addSessionToRecordQUDs(capId, gq_session);

        // Add APO to record
        addAPOByParcelNum(formData.arcgis_APN, capId, formData.arcgis_STREETNUMB);

        // Associate Public User to the new Temp record
        if (!formData.publicUserID) {
            formData.publicUserID = "marshalltbrown";
        }
        addPublicUserToRecordAsContact(formData.publicUserID, capId, "Applicant");
    }
    logDebug("Record json info: " + JSON.stringify(recordInfoList, null, 2));
    aa.env.setValue("gwiz_records", JSON.stringify(recordInfoList));
}
catch (err) {
    logDebug(err)
}
// End Main Code

/* GWIZ FUNCTIONS */
function getFeeTable(capId) {
    var feeItems = getEstimatedFees(capId);
    var feeEstimate = {};
    feeEstimate.total = 0;
    feeEstimate.feeItems = feeItems;
    if(feeItems){
        for (var i = 0; i < feeItems.length; i++) {
            var item = feeItems[i];
            feeEstimate.total += parseInt(item.due, 10);
        }
    }
    return feeEstimate;


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
    var primaryParcelList = aa.parcel.getParceListForAdmin(parcelNumber, null, null, null, null, null, null, null, null, null).getOutput();
    if (!primaryParcelList || primaryParcelList.length == 0) {
        logDebug("No parcel found with number " + parcelNumber);
        return;
    }
    var primaryParcel = primaryParcelList[0].getParcelModel();
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


function addRecordTypeIdentifier(pcapId, recordType, recordTypeFieldValue) {
    var fieldIdentifier = lookup("GWIZ_RECORD_TYPE_IDENTIFIER_MAP", recordType);
    if (!fieldIdentifier) return;
    var fieldIdentifierArray = fieldIdentifier.split("|");
    if (fieldIdentifierArray.length != 3) return;

    useAppSpecificGroupName = true;
    var asi = aa.appSpecificInfo.getByCapID(pcapId).getOutput();
    asi.forEach(function (a) {
        var asiGroup = a.groupCode;
        var asiSubGroup = a.checkboxType;
        var asiType = a.checkboxDesc;
        var recASI = [asiGroup, asiSubGroup, asiType];

        if (fieldIdentifierArray[0] == recASI[0] || fieldIdentifierArray[0] == "*") {
            if (fieldIdentifierArray[1] == recASI[1] || fieldIdentifierArray[1] == "*") {
                if (fieldIdentifierArray[2] == recASI[2] || fieldIdentifierArray[2] == "*") {
                    var editResult = aa.appSpecificInfo.editSingleAppSpecific(pcapId, fieldIdentifierArray[2], recordTypeFieldValue, null);
                    if (editResult.getSuccess()) {
                        logDebug("Successfully edited record type field " + fieldIdentifierArray[2] + " to " + recordTypeFieldValue);
                    }
                }
            }
        }
    });

}

function processGWIZASI(formData, pcapId) {
    var asiData = {};
    for (var i in formData) {
        // if the key begins and ends with '-' then it is an ASI field
        if (i[0] == '-' && i[i.length - 1] == '-') {
            var fieldValue = formData[i];
            if (fieldValue == "0") fieldValue = null;
            if (fieldValue) fieldValue = fieldValue.replace("&amp;", "&");
            var fieldLabel = lookup("GWIZ_ASI_MAP", i);
            if (fieldLabel && fieldValue) {
                asiData[fieldLabel] = fieldValue;
            }
        }
    }

    var completedASI = {};
    useAppSpecificGroupName = true;
    var asi = aa.appSpecificInfo.getByCapID(pcapId).getOutput();
    asi.forEach(function (a) {
        var asiGroup = a.groupCode;
        var asiSubGroup = a.checkboxType;
        var asiType = a.checkboxDesc;
        var recASI = [asiGroup, asiSubGroup, asiType];

        Object.keys(asiData).forEach(function (f) {
            var fieldDesc = f.split("|");

            if (fieldDesc[0] == recASI[0] || fieldDesc[0] == "*") {
                if (fieldDesc[1] == recASI[1] || fieldDesc[1] == "*") {
                    if (fieldDesc[2] == recASI[2] || fieldDesc[2] == "*") {
                        var editResult = aa.appSpecificInfo.editSingleAppSpecific(pcapId, fieldDesc[2], asiData[f], null);
                        if (editResult.getSuccess()) {
                            logDebug("Successfully edited ASI Field " + fieldDesc[2] + " to " + asiData[f]);
                            completedASI[f] = asiData[f];
                        }
                    }
                }
            }
        });
    });

    var textString;
    if (Object.keys(completedASI) && Object.keys(completedASI).length > 0) {
        textString = '';
        for (var key in completedASI) {
            textString += '<p>' + key.split("|")[2] + ': ' + completedASI[key] + '</p>';
        }
    } else {
        textString = "None";
    }
    return textString;
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
            if (peopleArray && peopleArray.length > 0)
                return peopleArray[0];
        }
        return null;
    }
}

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
            if (requirements && requirements.length) {
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

function gqGetCustomGWIZUrl(itemCap, routeId) {
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
    if (String(enableCustomWrapper).toLowerCase() == "yes")
        acaUrl += "&FromACA=Y";
    acaUrl += "&stepNumber=2&pageNumber=1";
    return acaUrl;
}

/* UTILITY FUNCTIONS */

function lookup(stdChoice, stdValue) {
    var strControl;
    var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);
    if (bizDomScriptResult.getSuccess()) {
        var bizDomScriptObj = bizDomScriptResult.getOutput();
        strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
        logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
    }
    else {
        logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
    }
    return strControl;
}

function logDebug(dstr) {
    aa.print(dstr + "<br>");
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

function getScriptText(vScriptName, servProvCode, useProductScripts) {
    if (!servProvCode) servProvCode = aa.getServiceProviderCode();
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    try {
        if (useProductScripts) {
            var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
        } else {
            var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
        }
        return emseScript.getScriptText() + "";
    } catch (err) {
        return "";
    }
}
