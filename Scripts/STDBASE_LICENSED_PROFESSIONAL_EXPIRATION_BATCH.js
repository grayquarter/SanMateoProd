var confScriptName = aa.env.getValue("confScriptName");
//var confScriptName = "CONF_LICENSED_PROFESSIONAL_EXPIRATION_BATCH";

var sysDate = aa.date.getCurrentDate();
var currentUserID = aa.getAuditID();
aa.env.setValue("CurrentUserID", "ADMIN");
var systemUserObj;
if (currentUserID != null) {
	systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
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

eval(getScriptText("INCLUDES_RECORD"));
eval(getScriptText("INCLUDES_BASEBATCH"));
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true));

Batch.prototype.execute = function() {
	try {
		//execute main()
		if (!confScriptName) {
			logDebug("ERROR: Missing required batch parameter confScriptName: " + confScriptName);
			return false;
		}
		checkLP(confScriptName);

	} catch (e) {
		this.log("ERROR: ", e + "");
	}

}

run();

function checkLP(confSearchScriptName){
	
	var cfgJsonStr = getScriptText(confSearchScriptName);
	var searchRules = JSON.parse(cfgJsonStr)
	if (!searchRules) {
		logDebug("ERROR: Search rules not found. Script Name: " + confSearchScriptName);
		return false;
	}
	
	var thisSearchRule = searchRules["aboutToExpireSearchRules"];
	var dates = thisSearchRule.searchCriteria.searchByDates;
	var aboutToExpDays = thisSearchRule.searchCriteria.searchAboutToExpireDaysOut;

	var model = aa.licenseProfessional.getLicenseProfessionScriptModel();
	if(model.getSuccess()){
		
		var licProf = aa.licenseScript.getRefLicensesProfByName("STANDARDDEV", "", "", "").getOutput(); 

		for(prof in  licProf){

			logDebug("License Professional: "+licProf[prof].getStateLicense());
	
			//Disable out dated LP
			if (validateDate(licProf[prof].getLicenseExpirationDate())
					|| validateDate(licProf[prof].getBusinessLicExpDate())
					|| validateDate(licProf[prof].getLicenseIssueDate())
					|| validateDate(licProf[prof].getInsuranceExpDate())){
				var c = aa.licenseScript.updateLicenseStatusByTypeAndNbr(licProf[prof].getLicenseType(), licProf[prof].getStateLicense(), "I");
				logDebug("Disable LP: "+c.getSuccess())
				continue;
			}
	
			//Add condition if license is about to expire
			if (checkAboutToExpireDate(licProf[prof].getLicenseExpirationDate(), aboutToExpDays)
					|| checkAboutToExpireDate(licProf[prof].getBusinessLicExpDate(), aboutToExpDays)
					|| checkAboutToExpireDate(licProf[prof].getLicenseIssueDate(), aboutToExpDays)
					|| checkAboutToExpireDate(licProf[prof].getInsuranceExpDate(), aboutToExpDays)){
	
				var condName = thisSearchRule.addCondition.createCondition;
				var condGroup = thisSearchRule.addCondition.createConditionGroup;
				var condType = thisSearchRule.addCondition.createConditionType;
				var condSeverity = thisSearchRule.addCondition.createConditionSeverity;
				var condPriority = thisSearchRule.addCondition.createConditionPriority;
				var condStatus = thisSearchRule.addCondition.createConditionStatus;
	
				logDebug("Checking conditions...")
				var conditions = aa.caeCondition.getCAEConditions(licProf[prof].getLicSeqNbr()).getOutput();
	
				if(conditions.length <= 0){//no condition
					logDebug("Adding condition for about to expire LP")
					addLicenseCondition(condType,condStatus,condName,"Auto created", condPriority, licProf[prof].getStateLicense())
				}
			}
		}
	}	
}

function validateDate(date){
	
	if(date != null){

		var dateValue = date.getYear()+'-'+date.getMonth()+'-'+date.getDayOfMonth();
		date = aa.util.parseDate(dateValue);
		var currDate = aa.util.now();
		
		logDebug("Current date: "+currDate);
		logDebug("Param date: "+date);
		if(currDate.getTime() >= date.getTime()){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function checkAboutToExpireDate(date, days){
	
	if(date != null){

		var dateValue = date.getYear()+'-'+date.getMonth()+'-'+date.getDayOfMonth();
		date = aa.util.parseDate(dateValue);
		var currDate = aa.util.now();
		
		var expectedDate = aa.util.now();
		expectedDate.setDate(expectedDate.getDate()+days)

		logDebug("Current Date "+currDate);
		logDebug("Expected Date "+expectedDate);
		logDebug("Param Date "+date);

		logDebug(date.getTime() <= expectedDate.getTime())
		if(date.getTime() > currDate.getTime() && date.getTime() <= expectedDate.getTime()){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
