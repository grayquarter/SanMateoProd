function logDebug(str) {aa.print(str);}

//Log All Environmental Variables as  globals
var params = aa.env.getParamValues();
var keys =  params.keys();
var key = null;
while(keys.hasMoreElements())
{
 key = keys.nextElement();
 eval("var " + key + " = aa.env.getValue(\"" + key + "\");");
 logDebug("Loaded Env Variable: " + key + " = " + aa.env.getValue(key));
}

var capId = aa.cap.getCapID(RECORDID).getOutput();

var queryWorkingDay = new com.accela.aa.inspection.assign.model.WorkingDayQueryModel;
queryWorkingDay.setServProvCode(aa.getServiceProviderCode());
queryWorkingDay.setFromDate(new java.util.Date(FROMDATE));
queryWorkingDay.setCount(parseInt(COUNT));
queryWorkingDay.setInspSeqNum(parseInt(INSPECTIONTYPE));

var boolIsValidateCutOffTime = new java.lang.Boolean(isValidateCutOffTime);
var boolIsValidateScheduleNumOfDays = new java.lang.Boolean(isValidateScheduleNumOfDays);
var boolIsGettingDataFromACA = new java.lang.Boolean(isGettingDataFromACA);
var boolIsIncludeGivenDay = new java.lang.Boolean(isIncludeGivenDay);
var boolIsValidateEventScheduleAllocatedUnits = new java.lang.Boolean(isValidateEventScheduleAllocatedUnits);

var test = aa.calendar.getNextWorkDay(capId, queryWorkingDay, boolIsValidateCutOffTime, boolIsValidateScheduleNumOfDays, boolIsGettingDataFromACA, boolIsIncludeGivenDay, boolIsValidateEventScheduleAllocatedUnits);

if (test.getSuccess())
{
  test = test.getOutput().toArray();
  for (t in test)
    logDebug(t + " : " + test[t].getDate() + " " + test[t].getTimes());

  aa.env.setValue("RESULT",test);
}
else logDebug(test.getErrorMessage());