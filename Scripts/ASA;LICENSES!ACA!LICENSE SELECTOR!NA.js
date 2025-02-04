// Create Primary License
asitArray = new Array;
asitArray = loadASITable("LICENSES APPLIED FOR");
for (x in asitArray) {
	prepareAssocatedForm(asitArray[x]["Application Type"].toString());
}


// Custom Functions
function prepareAssocatedForm(vAppType){
	var cTypeArray = vAppType.split("/");
	var childId;
	childId = createChildTempRecord(cTypeArray,vAppType);
}

function createChildTempRecord(cTypeArray,vAppType){
	var childId = null;
	var groupsIgnoreArray;
	if (arguments.length > 0) {
		groupsIgnoreArray = arguments[1];
	}
	var cRecordArray = getChildren(cTypeArray[0] + "/" + cTypeArray[1] + "/" + cTypeArray[2] + "/" + cTypeArray[3],capId);
	if (isEmpty(cRecordArray)){
		try{
			logDebug("Creating " + cTypeArray[0] + "/" + cTypeArray[1] + "/" + cTypeArray[2] + "/" + cTypeArray[3]);
			ctm = aa.proxyInvoker.newInstance("com.accela.aa.aamain.cap.CapTypeModel").getOutput();
			ctm.setGroup(cTypeArray[0]);
			ctm.setType(cTypeArray[1]);
			ctm.setSubType(cTypeArray[2]);
			ctm.setCategory(cTypeArray[3]);
			childIdResult = aa.cap.createSimplePartialRecord(ctm, null, "INCOMPLETE TMP");
			var childId = childIdResult.getOutput();
			logDebug("result " + childId + ":" + childIdResult.getErrorMessage());
			if(childId){
				aa.cap.createAssociatedFormsHierarchy(capId, childId);
				copyAddresses(capId, childId);
				copyAppSpecificWithSubGroup(childId);
				updateLicenseTypeSubType(vAppType,capId,childId);
			}


		}
		catch (err) {
			logDebug("createChildTempRecord Error occured: " + err.message);
		}
	}
	return childId;
}

function updateLicenseTypeSubType(vAppType,fromCapId, toCapId){
	// If Boarding Stable and No License
	useAppSpecificGroupName = true;
	if(matches(getAppSpecific("AGRICULTURE.Q01",fromCapId),"YES","Yes","Y") && matches(getAppSpecific("AGRICULTURE.Q02",fromCapId),"YES","Yes","Y") && matches(getAppSpecific("AGRICULTURE.Q03",fromCapId),"NO","No","N")){
		if(vAppType == "Licenses/General/Agriculture/Application"){
			editAppSpecific("License Type","Boarding Stable",toCapId);
			editAppSpecific("License Subtype","Boarding Stable",toCapId);
		}
		if(vAppType == "Licenses/General/Education/Application"){
			editAppSpecific("License Type","Educational Instructor",toCapId);
			editAppSpecific("License Subtype","Educational Instructor",toCapId);
		}
	}
	useAppSpecificGroupName = false;
}

function copyAppSpecificWithSubGroup(newCap) // copy all App Specific info into new Cap, 1 optional parameter for ignoreArr
{
    useAppSpecificGroupName = true;
    var AppSpecInfo = new Array();
    loadAppSpecific(AppSpecInfo,capId);
    var ignoreArr = new Array();
    var limitCopy = false;
    if (arguments.length > 1) 
    {
        ignoreArr = arguments[1];
        limitCopy = true;
    }
    
    for (asi in AppSpecInfo){
        //Check list
        if(limitCopy){
            var ignore=false;
              for(var i = 0; i < ignoreArr.length; i++)
                  if(ignoreArr[i] == asi){
                      ignore=true;
                      break;
                  }
              if(ignore)
                  continue;
        }
        editAppSpecific(asi,AppSpecInfo[asi],newCap);
    }
    useAppSpecificGroupName = false;
}