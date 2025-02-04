//ASA:LICENSES/CONTRACTOR/GENERAL/RENEWAL

//For Partner08 mockup

//Must config in Admin > Record Type Definition on the master renewal : Enable Associated Forms, Enable Partial Submission


parentCapId = null;
parentCapString = "" + aa.env.getValue("ParentCapID");
if(parentCapString && parentCapString.length > 0) {
    parentArray = parentCapString.split("-") ;
    if(parentArray.length > 1) parentCapId = aa.cap.getCapID(parentArray[0],parentArray[1],parentArray[2]).getOutput();
    logDebug("Parent CapId at inst " + parentCapId);
}

if(!parentCapId) {
    parentCapId = getParentCapID4Renewal(capId);
} else {
    logDebug("getParentCapID4Renewal Failed to retrieve parent capid");
}

if(parentCapId) {

	var pr = prepareRenewal();

	//Plumbing associated form
	var childPlumbLic = getChildren("Licenses/Contractor/Plumbing/License",parentCapId);
	if(childPlumbLic && childPlumbLic.length) {
		childPlumbLicCapId = childPlumbLic[0];

		var result = aa.cap.getProjectByMasterID(childPlumbLicCapId, "Renewal", "Incomplete");
		if (result.getSuccess()) {
			//has had renewals, but none currently incomplete
			var partialProjects = result.getOutput();
			if (partialProjects != null && partialProjects.length > 0) {
				logDebug("Warning: Renewal process was initiated before. ( " + childPlumbLicCapId + ")");
			} else {
				createRenewalAF(capId, childPlumbLicCapId, "Licenses", "Contractor", "Plumbing", "Renewal");
			}
		} else {
			//no renewals ever
			createRenewalAF(capId, childPlumbLicCapId, "Licenses", "Contractor", "Plumbing", "Renewal");
		}
	}

	//Electrical associated form
	var childElecLic = getChildren("Licenses/Contractor/Electrical/License",parentCapId);
	if(childElecLic && childElecLic.length) {
		childElecLicCapId = childElecLic[0];

		var result = aa.cap.getProjectByMasterID(childElecLicCapId, "Renewal", "Incomplete");
		if (result.getSuccess()) {
			if (partialProjects != null && partialProjects.length > 0) {
				logDebug("Warning: Renewal process was initiated before. ( " + childElecLicCapId + ")");
			} else {
				createRenewalAF(capId, childElecLicCapId, "Licenses", "Contractor", "Electrical", "Renewal");
			}
		} else {
			//no renewals ever
			createRenewalAF(capId, childElecLicCapId, "Licenses", "Contractor", "Electrical", "Renewal");
		}
	}

}

function createRenewalAF(grandparent, parent, group, type, sub, cat) {
	var ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();
		ctm.setGroup(group);
		ctm.setType(type);
		ctm.setSubType(sub);
		ctm.setCategory(cat);

	var childRenewalCapId = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE TMP").getOutput();
	if(childRenewalCapId) {
		var result = aa.cap.createRenewalCap(parent, childRenewalCapId, true);
		aa.cap.createAssociatedFormsHierarchy(grandparent, childRenewalCapId);
	}
}