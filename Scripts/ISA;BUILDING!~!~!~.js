var inspObj = aa.inspection.getInspection(capId, inspId).getOutput();

var reqPhone = inspObj.getRequestPhoneNum();
logDebug("Request Phone = " + reqPhone);
var schdt = dateAdd(inspObj.getScheduledDate(), 0);
var schTime = (inspObj.getScheduleTime() == null ? "" : inspObj.getScheduleTime());
var schDtTime = (schTime == "" ? schdt : schdt + " " + schTime);

logDebug("inspObj.getScheduledDate()=" + schdt)
logDebug("inspObj.getScheduleTime()=" + schTime)
logDebug("Date Time=" + schDtTime);

var pars = aa.util.newHashtable();
pars.put("$$DATETIME$$", schDtTime);
pars.put("$$INSP_TYPE$$", inspType);
pars.put("$$ALTID$$", capIDString);
gqSendCommunication("INSPECTION_MESSAGE", pars, String(reqPhone), "", "", "", "gqSendCommunication")