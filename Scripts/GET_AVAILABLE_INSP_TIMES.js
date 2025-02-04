/*==================================================================
    | Script Name: GET_AVAILABLE_INSP_TIMES.js
    | Version: 1.0
    | Created by: Colton Firestone
    | Created on: 12/19/2024
    | Neccesary Variables:
    |       RECORDID: Record ID
    |       COUNT: Number of days to search for
    |       INSPID: Inspection ID
    |       TIMEINTERVAL: Time interval in minutes
    |       isValidateCutOffTime: Boolean
    |       isValidateScheduleNumOfDays: Boolean
    |       isGettingDataFromACA: Boolean
    |       isIncludeGivenDay: Boolean
    |       isValidateEventScheduleAllocatedUnits: Boolean
    |
    | Description: This script will return available inspection times for a given inspection type
    | and record ID. The script will return the next COUNT number of available inspection times
    | for the given inspection type. The script will return the date and available times for each
    | day. The script will return the available times in TIMEINTERVAL minute increments.
    | The script will return the available times in JSON format.
    |==================================================================*/
    /* Example/testing variables 
    var RECORDID = "ELEV-000142";
    var COUNT = "20";
    var INSPID = "34778442";
    var TIMEINTERVAL = 30;
    var isValidateCutOffTime = true;
    var isValidateScheduleNumOfDays = true;
    var isGettingDataFromACA = true;
    var isIncludeGivenDay = true;
    var isValidateEventScheduleAllocatedUnits = true;
    */

    var RECORDID = "RES-NEW-24-000040";
    var COUNT = "20";
    var INSPID = "11812";
    var TIMEINTERVAL = 30;
    var isValidateCutOffTime = true;
    var isValidateScheduleNumOfDays = true;
    var isGettingDataFromACA = true;
    var isIncludeGivenDay = true;
    var isValidateEventScheduleAllocatedUnits = true;





    function logDebug(str) {aa.print(str);}
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
    var inspection = aa.inspection.getInspection(capId, INSPID)
    if (inspection.getSuccess()) {
        inspection = inspection.getOutput();
    } else {
        logDebug("Error getting inspection: " + inspection.getErrorMessage());
    }
    var inspModel = inspection.getInspection();
    var inspSeqNum = inspModel.getInspSequenceNumber();
    var today = new Date();
    var FROMDATE = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    var INSPECTIONTYPE = inspSeqNum;
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
        var output = [];
        for (t in test) {
            var times = [];
            var timeframes = test[t].getTimes();
            timeframes = timeframes.toArray();
            var tfString = timeframes[0] + "";
            tfString = tfString.split(" - ");
            var startTime = tfString[0].split(" ")[1];
            var endTime = tfString[1].split(" ")[1];
            var startHour = parseInt(startTime.split(":")[0]);
            var startMinute = parseInt(startTime.split(":")[1]);
            var endHour = parseInt(endTime.split(":")[0]);
            var endMinute = parseInt(endTime.split(":")[1]);
            var start = startHour * 60 + startMinute;
            var end = endHour * 60 + endMinute;
            var interval = TIMEINTERVAL;
            var times = [];
            for (var i = start; i < end; i += interval) {
                var hour = Math.floor(i / 60);
                var minute = i % 60;
                times.push(hour + ":" + minute);
            }
            var outputTimes = [];
            for (var i = 0; i < times.length; i++) {
                var time = times[i].split(":");
                var hour = parseInt(time[0]);
                var minute = parseInt(time[1]);
                var ampm = "AM";
            if (hour >= 12) {
                if (hour > 12) {
                    hour -= 12; 
                }
                ampm = "PM"; 
            } else if (hour === 0) {
                hour = 12;  
                ampm = "AM";
            }
                outputTimes.push(hour + ":" + minute + " " + ampm);
            }
            var date = test[t].getDate();
            date = date + "";
            date = date.split(" ");
            date = date[1] + " " + date[2] + " " + date[5];
            var newDate = new Date(date);
            var outputDate = newDate.getMonth() + 1 + "/" + newDate.getDate() + "/" + newDate.getFullYear();
            output.push({
                date: outputDate,
                times: outputTimes
            });
        }
        /* log the output for testing
        for (o in output) {
            logDebug('');
            logDebug("Date: " + output[o].date);
            for (t in output[o].times) {
                logDebug("Time: " + output[o].times[t]);
            }
        }
        */
      output = JSON.stringify(output);
      aa.env.setValue("RESULT",output);
    }
    else logDebug("Error: " + test.getErrorMessage());
