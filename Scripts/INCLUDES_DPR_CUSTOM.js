/*------------------------------------------------------------------------------------------------------/
| Program : INCLUDES_DPR_CUSTOM.js
| Event   : N/A
|
| Usage   : Override standard plan room functions
|
| Notes   : 
|
/------------------------------------------------------------------------------------------------------*/

Dpr.Custom = {};
Dpr.Custom.ACA_URL = "https://aca-test.accela.com/partner08";
Dpr.Custom.AA_URL = "https://partner08-test-av.accela.com";
(function () {

	// ADD TO LIBRARY
	Dpr.getProjectSubmittalChecklists = function (user, capId) {
		
		var projectId = capId.getId() + "";
		Dpr.log("Getting submittal checklists for project: " + capId.getCustomID());
	
		var response = Dpr.sendGet(Dpr.getEndpoint() + "/settings/projects/" + projectId +  "/submittals/checklist", user);
		if (response.code === 200) {
			return response.body;
		}
	
		throw new Error("Failed to get submittal checklists for project: " + capId.getCustomID() + ". Response code: " + response.code);
	}

	Dpr.getProjectFiles = function (user, capId) {
		
		var projectId = capId.getId() + "";
		Dpr.log("Getting file list for project: " + capId.getCustomID());
	
		var response = Dpr.sendGet(Dpr.getEndpoint() + "/projects/" + projectId + "/files", user);
		if (response.code === 200) {
			return response.body;
		}
	
		throw new Error("Failed to get files list for project: " + capId.getCustomID() + ". Response code: " + response.code);
	}

	function getPrintSetTemplate (context) {
		var template = "building_default";

		if (context.capType === "Building/MasterPlans/NA/NA") {
			template = "building_mp";
		} else if (context.capType === "Building/Revision/NA/NA") {
			template = "building_revision";
			var parent = Dpr.getParentRecord(context.capId);
			if (parent) {
				cap = aa.cap.getCap(parent).getOutput();
				capType = cap.getCapType().toString() + "";
				if (capType === "Building/MasterPlans/NA/NA") {
					template = "building_mp_revision";
				} else if (Dpr.getCustomField(parent, "masterPlans") === "Yes") {
					template = "building_revision_pof";
				}
			}
		} else if (Dpr.getCustomField(context.capId, "masterPlans") === "Yes") {
			template = "building_pof";
		}

		return template;
	}

	Dpr.Actions.setDefaultSheetSetOrder =  function (context, options) {
		var capId = context.capId;
		var user = context.user;
	
		if (options && options.type) {
			var sheetSetOrders = Dpr.getSheetSetOrders(user, capId);
			for (var i=0; i < sheetSetOrders.length; i++) {
				var sheetSetOrder = sheetSetOrders[i];
				if (sheetSetOrder.type === options.type && sheetSetOrder.default !== "Y") {
					Dpr.updateSheetSetOrder(user, capId, { 
						id: sheetSetOrder.id,
						default: "Y"
					});
					break;
				}
			}
		} else {
			Dpr.error("No type set for default sort order on project: " + capId.getCustomID());
		}
	}

	Dpr.getSheetSetOrders = function (user, capId) {
		var projectId = capId.getId() + "";
		Dpr.log("Get sheet set orders for: " + capId.getCustomID());
	
		var response = Dpr.sendGet(Dpr.getEndpoint() + "/projects/" + projectId + "/sheetsetorders", user);
		if (response.code === 200) {
			return response.body;
		}
	
		throw new Error("Failed to get sheet set orders project: " + projectId + ". Response code: " + response.code);
	}

	Dpr.updateSheetSetOrder = function (user, capId, order) {
	
		var projectId = capId.getId() + "";
		Dpr.log("Update sheet set order sent for: " + capId.getCustomID());
	
		var response = Dpr.sendPut(Dpr.getEndpoint() + "/projects/" + projectId + "/sheetsetorders/" + order.id, user, order);
		if (response.code !== 200 && response.code !== 304) {
			throw new Error("Failed to update sheet set order for project: " + projectId + ". Response code: " + response.code);
		}
	}

	function getProjectResubmittalChecklist (context) {
		function getDocTypesFromOpenIssues(user, capId) {
			function addItem(item) {
				var index = docTypes.indexOf(item);
				if (index === -1) {
					docTypes.push(item);
				}
			}
			
			function getDocTypeByDocumentId(id, documents) {
				for (var d=0; d < documents.length; d++) {
					if (id === documents[d].id) {
						return documents[d].type;
					}
				}
			}
			
			function getFileIdBySheetId(id, sheets) {
				for (var s=0; s < sheets.length; s++) {
					if (id === sheets[s].id) {
						return sheets[s].file;
					}
				}
			}
			
			function getDocTypeByFileId (id, files) {
				for (var f=0; f < files.length; f++) {
					if (id === files[f].id) {
						return files[f].type;
					}
				}
			}
		
			var issues = Dpr.getIssues(user, capId, ["Draft", "Open"]);
			var docTypes = [];
			var projectDocuments = Dpr.getProjectDocuments(user, capId);
			var projectSheets = Dpr.getProjectSheets(user, capId);
			var projectFiles = Dpr.getProjectFiles(user, capId);
			//aa.print(projectFiles);
			
			for (var i=0; i < issues.length; i++) {
				// if upload not required for issues move to next issue
				if (issues[i].uploadRequired !== "yes") continue;
				
				var targetType = issues[i].targetType;
				if (!targetType) continue;
			
				if (targetType === "doc") {
					// to do, get all ids and query DPR once
					var documentId = issues[i].createdVersion;
					var docType = getDocTypeByDocumentId(documentId, projectDocuments);
					//aa.print(docType);
					addItem(docType);
					//docTypes.push(docType);
				} else if (targetType === "sheet") {
					var sheetVersion = issues[i].createdVersion;
					//aa.print(sheetVersion);
					var fileId = getFileIdBySheetId(sheetVersion, projectSheets);
					//aa.print(fileId);
					if (fileId) {
						var docType = getDocTypeByFileId(fileId, projectFiles);
						//aa.print(docType);
						addItem(docType);
						//docTypes.push(docType);
					}
				}
			}
		
			return docTypes;
		}

		function getCheclistTemplatesFromDocTypes(user, capId, docTypes) {
			var templates = [];
			var projectChecklists = Dpr.getProjectSubmittalChecklists(user, capId);
		
			if (projectChecklists && projectChecklists.length > 0) {
				if (docTypes && docTypes.length > 0) {
					for (var dt=0; dt < docTypes.length; dt++) {
						var found = false;
						for (var cl=0; cl < projectChecklists.length; cl++) {
							if (docTypes[dt] === projectChecklists[cl].description) {
								found = true;
								var template = {
									apply: true,
									description: projectChecklists[cl].description,
									template: projectChecklists[cl].id
								}
								templates.push(template);
								break;
							}
						}
		
						if (!found) {
							var template = {
								apply: true,
								description: docTypes[dt]
							}
							templates.push(template);
						}
					}
				} else {
					Dpr.error("No docTypes for project:" + capId.getCustomID());
				}
			} else {
				Dpr.log("No checklists configured for project:" + capId.getCustomID());
			}
			
			return templates;
		}

		var checklist = [];
		var user = Dpr.getAdminUser();
		var capId = context.capId;

		var docTypes = getDocTypesFromOpenIssues(user, capId);

		if (docTypes && docTypes.length > 0) {
			checklist = getCheclistTemplatesFromDocTypes(user, capId, docTypes);
		}

		return checklist;
	}

	function updateProjectResubmittalChecklist (context) {
		function getDocTypesFromOpenIssues(user, capId) {
			function addItem(item) {
				var index = docTypes.indexOf(item);
				if (index === -1) {
					docTypes.push(item);
				}
			}
			
			function getDocTypeByDocumentId(id, documents) {
				for (var d=0; d < documents.length; d++) {
					if (id === documents[d].id) {
						return documents[d].type;
					}
				}
			}
			
			function getFileIdBySheetId(id, sheets) {
				for (var s=0; s < sheets.length; s++) {
					if (id === sheets[s].id) {
						return sheets[s].file;
					}
				}
			}
			
			function getDocTypeByFileId (id, files) {
				for (var f=0; f < files.length; f++) {
					if (id === files[f].id) {
						return files[f].type;
					}
				}
			}
		
			var issues = Dpr.getIssues(user, capId, ["Open"]);
			var docTypes = [];
			var projectDocuments = Dpr.getProjectDocuments(user, capId);
			var projectSheets = Dpr.getProjectSheets(user, capId);
			var projectFiles = Dpr.getProjectFiles(user, capId);
			//aa.print(projectFiles);
			
			for (var i=0; i < issues.length; i++) {
				// if upload not required for issues move to next issue
				if (issues[i].uploadRequired !== "yes") continue;
				
				var targetType = issues[i].targetType;
				if (!targetType) continue;
			
				if (targetType === "doc") {
					// to do, get all ids and query DPR once
					var documentId = issues[i].createdVersion;
					var docType = getDocTypeByDocumentId(documentId, projectDocuments);
					//aa.print(docType);
					addItem(docType);
					//docTypes.push(docType);
				} else if (targetType === "sheet") {
					var sheetVersion = issues[i].createdVersion;
					//aa.print(sheetVersion);
					var fileId = getFileIdBySheetId(sheetVersion, projectSheets);
					//aa.print(fileId);
					if (fileId) {
						var docType = getDocTypeByFileId(fileId, projectFiles);
						//aa.print(docType);
						addItem(docType);
						//docTypes.push(docType);
					}
				}
			}
		
			return docTypes;
		}

		function getCheclistTemplatesFromDocTypes(user, capId, docTypes) {
			var templates = [];
			var projectChecklists = Dpr.getProjectSubmittalChecklists(user, capId);
		
			if (projectChecklists && projectChecklists.length > 0) {
				if (docTypes && docTypes.length > 0) {
					for (var dt=0; dt < docTypes.length; dt++) {
						var found = false;
						for (var cl=0; cl < projectChecklists.length; cl++) {
							if (docTypes[dt] === projectChecklists[cl].description) {
								found = true;
								var template = {
									apply: true,
									description: projectChecklists[cl].description,
									template: projectChecklists[cl].id
								}
								templates.push(template);
								break;
							}
						}
		
						if (!found) {
							var template = {
								apply: true,
								description: docTypes[dt]
							}
							templates.push(template);
						}
					}
				} else {
					Dpr.error("No docTypes for project:" + capId.getCustomID());
				}
			} else {
				Dpr.log("No checklists configured for project:" + capId.getCustomID());
			}
			
			return templates;
		}

		var user = Dpr.getAdminUser();
		var capId = context.capId;

		var docTypes = getDocTypesFromOpenIssues(user, capId);

		if (docTypes && docTypes.length > 0) {
			var templates = getCheclistTemplatesFromDocTypes(user, capId, docTypes);
			if (templates && templates.length > 0) {
				var submittalId = context.submittalId;
				
				if (!submittalId) {
					var latestProjectSubmittal = Dpr.getLatestProjectSubmittal(user, capId);
					if (latestProjectSubmittal) {
						var submittalId = latestProjectSubmittal.id;
					}
				}
									
				if (submittalId) {
					Dpr.updateSubmittalChecklist(user, capId, submittalId, templates);
				}
			}
		}
	}

	function cloneCheck (context) {
		var capId = context.capId;
		var capType = context.capType;
		var moveDprProject = Dpr.getCustomField(capId, "Move DPR Project");

		if (moveDprProject === "Yes") {
			var parent = Dpr.getParentRecord(capId);
	
			var to = {
				id: capId.getId() + "",
				number: capId.getCustomID() + "",
				typeId: capType
			}
	
			if (parent && Dpr.projectExists(Dpr.getAdminUser(), parent)) {
				Dpr.moveProject(Dpr.getAdminUser(), parent, to);
			}

			context.abort = true;
		}
	}

	function scheduleInspectionDocumentReview (context) {
		var capId = context.capId;
		var document = context.document;

		var result = aa.document.getDocumentByPK(document.id);
		if (!result.getSuccess()) {
			throw new Error("Error retrieving attachment. Id: " + document.id);
		}

		var docModel = result.getOutput();
		if (docModel) {
			var docTitle = docModel.getDocName() + "";
			var docCategory = docModel.getDocCategory() + "";
			var docDescription = docModel.getDocDescription() ? docModel.getDocDescription() + "" : "";

			var inspection = {
				daysAhead: 2,
				type: "Framing Inspection",
				comment: "Document Type: " + docCategory + " -- Document Name: " + docTitle + " -- Document Description: " + docDescription
			}

			Dpr.scheduleInspection(capId, inspection);

		} else {
			throw new Error("Error retrieving attachment. Id: " + document.id);
		}
	}

	function updateDraftIssuesInspectionType (context) {
		var capId = context.capId;
		var user = context.user;
		var inspectionType = context.inspectionType;

		var draftIssues = Dpr.getIssues(user, capId, ["draft"]);
		if (draftIssues && draftIssues.length > 0) {
			for (var i=0; i < draftIssues.length; i++) {
				draftIssues[i].title = inspectionType + ": " + draftIssues[i].title;
				Dpr.updateProjectIssue(user, capId,draftIssues[i]);
			}
		}
	}

 	/**
	 * Update the default sheet set order for a project
	 * @function scheduleInspection
	 * @param {capId} capId Accela capId object
	 * @param {object} inspection inspection object
	 * @param {string} inspection.type Inspection type
	 * @param {integer} inspection.daysAhead Schedule number of days out
	 * @param {string} inspection.time Inspection time
	 * @param {string} inspection.comment Inspection schedule comment
	 * @example
	 */
	 function scheduleInspection(capId, inspection) { 
		var iType = inspection.type;
		var inspectorObj = null;
		var inspTime = inspection.time? inspection.time : null;
		var inspComm = inspection.comment ? inspection.comment : "Scheduled via Script";
		var daysAhead = inspection.daysAhead ? inspection.daysAhead : 0;
		var inspDate = Dpr.dateAdd(null, daysAhead);
		if (inspection.inspectorId && inspection.inspectorId.length > 0) {
			var inspRes = aa.person.getUser(inspection.inspectorId);
			inspectorObj = inspRes.getSuccess() ? inspRes.getOutput() : null;
		}
	
		var schedRes = aa.inspection.scheduleInspection(capId, inspectorObj, aa.date.parseDate(inspDate), inspTime, iType, inspComm);
	
		if (schedRes.getSuccess()) {
			Dpr.log("Successfully scheduled inspection : " + iType + " for " + inspDate);
		} else {
			Dpr.error("ERROR: adding scheduling inspection (" + iType + "): " + schedRes.getErrorMessage());
		}	
	}
	
	function getDemoFromEmail (context) {
		var fromEmail = "Digital Plan Room [noreply@epermithub.com]";
		
		var result = aa.bizDomain.getBizDomain("DPR_DEMO_NOTIFICATION_SETTINGS");
		if (result.getSuccess()) {
			var bizDomain = result.getOutput();
			for (var i = 0; i < bizDomain.size(); i++) {
				var choice = bizDomain.get(i);
				if (!choice.getAuditStatus().equals("A")) {
					continue;
				}

				var choiceValue = choice.getBizdomainValue() + "";
				var choiceDescription = choice.getDescription() + "";
				if (choiceValue === "fromEmail") {
					return choiceDescription;
				}
			}
		}

		return fromEmail;
	}

	function getDemoNotificationFields(context) {
		var fields = {}
		
		var result = aa.bizDomain.getBizDomain("DPR_DEMO_NOTIFICATION_SETTINGS");
		if (result.getSuccess()) {
			var bizDomain = result.getOutput();
			for (var i = 0; i < bizDomain.size(); i++) {
				var choice = bizDomain.get(i);
				if (!choice.getAuditStatus().equals("A")) {
					continue;
				}

				var choiceValue = choice.getBizdomainValue() + "";
				var choiceDescription = choice.getDescription() + "";
				if (choiceValue === "agencyName") {
					fields.agencyName = choiceDescription;
				}

				if (choiceValue === "deptName") {
					fields.deptName = choiceDescription;
				}

				if (choiceValue === "deptEmail") {
					fields.deptEmail = choiceDescription;
				}

				if (choiceValue === "deptPhone") {
					fields.deptPhone = choiceDescription;
				}
			}
		}

		return fields;
	}

    Dpr.Custom.getPrintSetTemplate = getPrintSetTemplate;
	Dpr.Custom.updateProjectResubmittalChecklist = updateProjectResubmittalChecklist;
	Dpr.Custom.getProjectResubmittalChecklist = getProjectResubmittalChecklist;
	Dpr.Custom.cloneCheck = cloneCheck;
	Dpr.Custom.scheduleInspectionDocumentReview = scheduleInspectionDocumentReview;
	Dpr.Custom.updateDraftIssuesInspectionType = updateDraftIssuesInspectionType;
	Dpr.scheduleInspection = scheduleInspection;
	Dpr.Custom.getDemoFromEmail = getDemoFromEmail;
	Dpr.Custom.getDemoNotificationFields = getDemoNotificationFields;
})();
var defaultProcess = {
    pendingInitialStatus: "Awaiting Plans",
    pendingRevisionStatus: "Awaiting Revisions",
    voidAppStatuses: ["Void", "Withdrawn"],
    approvedConditionCheck: true,
    partialApprovedConditionCheck: true,
    autoAccept: false,
    submittalOmits: false,
    submittalDocumentTypesSync: false,
    sendMidCycleSubmittedNotification: false,
    type: "cycles",
    autoRouteResubmittal: {
        reviewStatus: "Revisions Received", //the status the review status is set to after autorouting.
        reviewStatusNotRequested: "", //the status the review status is set to if no revisions are requested.
        daysToComplete: Dpr.Custom.getRevisionDaysDue, //the number of days to complete the review status.
        workflowComment: "Autorouted for Review", //the workflow comment for the plans distribution task.
        addSheetTags: true, //true or false. Adds sheet tags to the plan sheets based on discipline. *
        to: "tagscorrections" //Which reviewers should the submittal be routed to. "tagscorrections" - route based on tags and corrections requested. "all" - route to all reviewers. "requested" - route to just reviewers that requested revisions.        
    },
    autoRouteCorrectionRequired: {workflowComment : "Autorouted Awaiting Revisions"},
    deleteReportPrintsets: false,
    issueApprovedDocs: false,
    workflow: {
        application: {
            tasks: ["Application Submittal", "Application Acceptance", "Application Intake"],
            actions: {
                receive: {
                    statuses: ["Plans Received"],
                    wtua: "sendPlansReceivedNotification"
                },
                reopen: {
                    statuses: ["Additional Info Required"],
                    wtua: ["reOpenLatestReviewPackage", "sendReOpenNotification"],
                    validate: "onValidateApplicationReOpen"
                },
                review: {
                    statuses: ["Accepted - Plan Review Req"],
                    wtua: "cleanAcceptReviewPackages",
                    validate: "onValidateApplicationReview"
                },
                noreview: {
                    statuses: ["Accepted - Plan Review Not Req", "Plan Review Not Required"],
                    wtua: "cleanAcceptReviewPackages",
                    validate: "onValidateApplicationReview"
                },
                terminate: {
                    statuses: ["Withdrawn", "Void", "Abandoned", "Cancelled"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'closed' } }, "removeProjectFromGroups", "deleteOpenReviewPackages"]
                },
                alert: {
                    statuses: ["File Validation Issues"],
                    wtua: "sendFileValidationIssuesNotification"
                }
            },
            page: "REVIEWPACKAGES"
        },
        distribution: {
            tasks: ["Plans Distribution"],
            actions: {
                receive: {
                    statuses: ["Revisions Received", "Corrections Received"],
                    wtua: ["sendRevisionsReceivedNotification", "sendReviewPackageSubmittedStaffNotification", "autoRouteResubmittal"]
                },
                reopen: {
                    statuses: ["Additional Info Required"],
                    wtua: ["reOpenLatestReviewPackage", "sendReOpenNotification"],
                    validate: "onValidateApplicationReOpen"
                },
                route: {
                    statuses: ["Routed for Review", "Accepted"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'inreview' } }, "cleanAcceptReviewPackages"],
                    validate: "onValidateDistributionRoute"
                },
                noreview: {
                    statuses: ["Accepted - Plan Review Not Req", "Plan Review Not Required"],
                    wtua: "cleanAcceptReviewPackages"
                },
                terminate: {
                    statuses: ["Withdrawn", "Void", "Abandoned", "Cancelled"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'closed' } }, "removeProjectFromGroups", "deleteOpenReviewPackages"]
                },
                alert: {
                    statuses: ["File Validation Issues"],
                    wtua: "sendFileValidationIssuesNotification"
                }
            },
            page: "REVIEWPACKAGES"
        },
        coordination: {
            tasks: ["Plans Coordination"],
            actions: {
                revise: {
                    statuses: ["Revisions Required", "Corrections Required"],
                    wtua: ["publishConditionsAll", "createNewCyclePackageAndPublishIssues", { action: "updateProjectStatus", options: { status: 'notapproved' } }, "sendReviewCycleNotApprovedNotification", "resetRevisionIntakeTask"],
                    validate: "onValidateCoordinationRevise"
                },
                ready: {
                    statuses: ["Ready to Issue"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'approved' } }, "publishIssuesAll", "publishConditionsAll", "createApprovedTemplatePrintsets", "createApprovedPlans", "createApprovedSupportingDocuments", "deleteReportPrintsets"],
                    validate: "onValidateCoordinationReady"
                },
                terminate: {
                    statuses: ["Withdrawn", "Void", "Abandoned", "Cancelled"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'closed' } }, "removeProjectFromGroups", "deleteOpenReviewPackages"]
                }
            },
            page: "ISSUES"
        },
        active: {
            tasks: ["Inspection"],
            actions: {
                receive: {
                    statuses: ["Revision Received"],
                    wtua: ["sendRevisionsReceivedNotification", "sendReviewPackageSubmittedStaffNotification"]
                },
                terminate: {
                    statuses: ["Permit Expired"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'withdrawn' } }, "removeProjectFromGroups"]
                }
            },
            page: "APPROVED"
        },
        complete: {
            tasks: ["Certificate of Occupancy"],
            actions: {
                co: {
                    statuses: ["Final CO Issued"],
                    wtua: { action: "updateProjectStatus", options: { status: 'closed' } }
                }
            },
            page: "APPROVED"
        },
        review: {
            actions: {
                revise: {
                    statuses: ["Revisions Required", "Corrections Required"],
                    wtua: ["onWtuaReviewRevise", "autoRouteCorrectionRequired"],
                    validate: "onValidateReviewRevise"
                },
                approve: {
                    statuses: ["Approved"],
                    wtua: ["publishConditionsTask", "approveSheetsByDiscipline", "autoRouteCorrectionRequired"],
                    validate: "onValidateReviewApprove"
                },
                partialapprove: {
                    statuses: ["Approved w/Comments", "Approved with Comments", "Approved as Noted"],
                    wtua: ["publishConditionsTask", "approveSheetsByDiscipline", "autoRouteCorrectionRequired"],
                    validate: "onValidateReviewPartialApprove"
                },
                receive: {
                    statuses: ["Revisions Received", "Corrections Received"],
                    wtua: "onWtuaReviewReceive"
                },
                filter: {
                    statuses: ["Not Required", "Not Applicable", "Not Needed"],
                    wtua: ["publishConditionsTask", "approveSheetsByDiscipline", "autoRouteCorrectionRequired"],
                    validate: "onValidateReviewApprove"
                }
            },
            page: "PLANS"
        }
    },
    ctrca: {
        actions: ["cloneCheck", "excludeRecordCheck", "setDefaultSubmissionStatus", "linkMasterPlans", "createProjectPlusSubmittal", "sendApplicationReceivedNotification"]
    },
    asua: {
        actions: "onApplicationStatusUpdateAfterDefault"
    },
    asiua: {
        actions: "onApplicationSpecificInfoUpdateAfterDefault"
    },
    adua: {
        actions: "onApplicationDetailUpdateAfterDefault"
    },
    submit: {
        actions: ["onSubmittalFinished", "onSubmittalFinishedSync", "midCycleSubmittedNotification"]
    },
    psab: {
        actions: ["updateProjectProperties"]
    },
    psaa: {
        actions: ["sendApprovedTemplateNotification","issueApprovedDocs"]
    },
    paa: {
        actions: ["sendApprovedPlansNotification"]
    },
    daa: {
        actions: ["sendApprovedDocumentsNotification","issueApprovedDocs"]
    },
    rsra: {
        actions: ["onReportServiceRunAfterDefault"]
    },
    attachment: {
        actions: ["onAttachmentNotification"]
    },
    psarchive: {
        actions: []
    },
    delete: {
        actions: ["removeProjectFromGroups", "deleteProject"]
    }
};

var bld_default = Dpr.Actions.extend(defaultProcess, {
    workflow: {
        application: {
            actions:
            {
                review: {
                    statuses: ["Accepted - Plan Review Req", "In Progress"],
                }
            }
        },
        issuance: {
            tasks: ["Permit Issuance"],
            actions: {
                issue: {
                    statuses: ["Issued"],
                },
                terminate: {
                    statuses: ["Denied", "Withdrawn"],
                    wtua: [{
                        action: Dpr.Actions.updateProjectStatus,
                        options: {
                            status: 'closed'
                        }
                    }, Dpr.Actions.removeProjectFromGroups]
                }                
            },
            page: "SUMMARY"
        },
        active: {
            tasks: ["Inspection"],
            actions: {
                receive: {
                    statuses: ["Temp CO Issued"],
                    wtua: ["sendRevisionsReceivedNotification", "sendReviewPackageSubmittedStaffNotification"]
                },
                terminate: {
                    statuses: ["Permit Expired"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'withdrawn' } }, "removeProjectFromGroups"]
                }, 
                complete: {
                    statuses: ["Final Inspection Complete"],
                    wtua: [{ action: "updateProjectStatus", options: { status: 'closed' } }, "removeProjectFromGroups"]
            },
            page: "APPROVED"
        },
    },
    complete: {
        tasks: ["Certificate of Occupancy"],
        actions: {
            co: {
                statuses: ["Final CO Issued", "Not Required"],
                wtua: { action: "updateProjectStatus", options: { status: 'closed' } }
            }
        },
        page: "APPROVED"
    },
    }

});



Dpr.Actions.setConfig({
    processes: {
        default: {
            autoRouteResubmittal: {to:"requested",newReviewStatus: "Revisions Received"},
            submittalDocumentTypesSync: true,
            autoRouteCorrectionRequired: true,
            workflow: {
                distribution: {
                    actions: {
                        route: {
                            wtua: [{ 
                                action: "updateProjectStatus", 
                                options: { 
                                    status: 'inreview' 
                                } 
                            }, "cleanAcceptReviewPackages"],
                        },
                    }
                },
                review: {
					actions: {
						revise: {
							wtua: ["publishConditionsTask", "publishIssuesTask", "sendDisciplineReviewRejectedNotification", "autoRouteCorrectionRequired"],
						},
						approve: {
							wtua: ["publishIssuesTask", "publishConditionsTask", "approveSheetsByDiscipline", "autoRouteCorrectionRequired"],
						},
						partialapprove: {
							wtua: ["publishIssuesTask", "publishConditionsTask", "approveSheetsByDiscipline", "autoRouteCorrectionRequired"],
						}
					}
				},
                coordination: {
                    actions: {
                        revise: {
                            wtua: ["publishConditionsAll", {
                                action: "createNewCyclePackageAndPublishIssues",
                                options: {
                                    checklist: "Dpr.Custom.getProjectResubmittalChecklist"
                                }
                            }, { action: "updateProjectStatus", options: { status: 'notapproved' } }, "sendReviewCycleNotApprovedNotification", "resetRevisionIntakeTask"],
                        },
                    }
                },
            },
            inspections: {
                framing: {
                    types: ["Framing Inspection"],
                    actions: {
                        isa: {
                            actions: ["syncApprovedPlans"],
                        },
                        irsa: {
                            pass: {
                                results: ["Passed"],
                                actions: ["sendApplicationReceivedNotification"]
                            },
                            fail: {
                                results: ["Failed"],
                                actions: ["Dpr.Custom.updateDraftIssuesInspectionType", "publishIssuesAll", "sendReviewCycleNotApprovedNotification"]
                            }
                        }
                    }
                }
            },
            ctrca: {
                actions: ["Dpr.Custom.cloneCheck", "excludeRecordCheck", "setDefaultSubmissionStatus", "linkMasterPlans", "createProjectPlusSubmittal", "sendApplicationReceivedNotification"]
            },
            psaa: {
                actions: ["sendApprovedTemplateNotification","issueApprovedDocs", "reconcileOldTemplate"]
            },
            attachment: {
                actions: ["Dpr.Custom.scheduleInspectionDocumentReview"]
            }

        },
        opencycles: {
            ctrca: {
                actions: ["Dpr.Custom.cloneCheck", "excludeRecordCheck", "setDefaultSubmissionStatus", "linkMasterPlans", "createProjectPlusSubmittal", "sendApplicationReceivedNotification"]
            }
        }
    },
    notifications: {
        default: {
            //from: "City of ePermitHub [noreply@epermithub.com]",
            //from: "Martin County[noreply@epermithub.com]",
            from: Dpr.Custom.getDemoFromEmail,
            to: Dpr.Custom.TEMP_TO,
            acaUrl: Dpr.Custom.ACA_URL,
            aaUrl: Dpr.Custom.AA_URL,
            emails: {
                applicationReceived: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                submitPlansReminder: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                submitRevisedPlansReminder: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                fileProcessingComplete: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                fileProcessingCompleteStaff: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                fileValidationIssues: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                fileValidationIssuesReminder: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                plansReceived: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                reviewPackageSubmittedStaff: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                additionalInfoRequired: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                disciplineReviewRejected: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                planReviewRejected: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                revisionsReceived: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                planReviewApproved: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                revisionRequestReceived: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                revisionRequestAccepted: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                revisionRequestApproved: {
                    fields: Dpr.Custom.getDemoNotificationFields
                },
                error: {
                    to: "dpr_errors@epermithub.com"
                }
            },
            adhocTasks: {
                error: {
                    task: "Plans Room Error",
                    initialStatus: "Logged",
                    adhocProcess: "MY_ADHOC_PROCESS"
                }
            },
            fields: {
                //agencyName: "City of ePermitHub",
                //agencyName: "Martin County",
                //agencyName: "Ranch Santa Fe Fire Protection District",
                //agencyName: "City of Holland",
                planReviewWebpage: "https://epermithub.com",
                uploadPlansTutorial: "https://youtu.be/pI83-RBfhdY",
                finalizeAndSubmitReviewPackageTutorial: "https://youtu.be/qGRPlRGqALs",
                issuesAndConditionsTutorial: "https://youtu.be/Djwqzj4kxR0",
                submitRevisedPlansTutorial: "https://youtu.be/1Vmkw59x7WI",
                downloadApprovedPlansTutorial: "https://youtu.be/amNZ4Q_ebc4",
                planAmendmentTutorial: "https://youtu.be/fVGJS8W3i1g"
            }
        },
        /*
        building: {
            fields: {
                deptName: "Building Department",
                //deptEmail: "info@epermithub.com",
                //deptPhone: "786-250-6336",
                //deptName: "Building Department",
                //deptEmail: "permitinfo@martincounty.org",
                //deptPhone: "(772) 288-5916"
                deptEmail: "permitinfo@hollywoodfl.org",
                deptPhone: "(954) 921-3335"
                //deptName: "Development Services",
                //deptPhone: "941-748-4501 ext. 6893",
                //deptEmail: "permitting@mymanatee.org"
            }
        }*/
    },
    settings: {
        building: {
            properties: {
                fields: [
                    { name: "MASTER_PLANS_USED", field: "masterPlans", default: "" },
                    { name: "ELEVATOR", field: "Elevator", default: "" },
                    { name: "ESTIMATED_COST", field: "Estimated Cost (Job Value)", default: "" },
                    { name: "SPRINKLER_SYSTEM", field: "Sprinkler System", default: "" },
                    { name: "BLD_STORIES", field: "Building Height (Stories)", default: "" }
                ]
            },
            revision: {
                parentCustomField: "Permit Number",
            },
            masterPlans: {
                masterPlanNumber: {
                    field: "masterPlanNumber"
                }
            },
            excludeRecord: {
                fieldLabel: "dprRecord",
                fieldValue: ["No"]
            }
        }
    },
    printSets: {
        default: {
            approvedTemplate: {
                template: Dpr.Custom.getPrintSetTemplate
            },
            approvedPlans: {
                type: "Approved Plans",
                watermarks: ["bld_plans"],
                reconcile: {
                    strategy: "archive",
                    types: ["Approved Plans", "Approved Drawings"],
                    archiveType: "Archived Approved Plans"
                }
            },
            approvedDocuments: {
                type: "Approved Documents"
            }
        }
    }
});