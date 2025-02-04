{
  "Licenses/Contractor/*/License": {
    "60 Day Notice": {
      "notificationTemplate": "SS_LICENSE_ABOUT_TO_EXPIRE",
      "notificationReport": false,
      "notifyContactTypes": "Business Entity",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LICENSE_ABOUT_TO_EXPIRE",
      "updateExpirationStatus": "About to Expire",
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 30,
      "nextNotification": "30 Day Notice"
    },
    "30 Day Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_30_DAY_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Business Entity",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXP_30_DAY_NOTICE",
      "updateExpirationStatus": false,
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 30,
      "nextNotification": "Expiration Notice"
    },
    "Expiration Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_FINAL_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Business Entity",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXPIRATION_FINAL_NOTICE",
      "updateExpirationStatus": "Expired",
      "updateRecordStatus": "Expired",
      "updateWorkflowTask": "License Status",
      "updateWorkflowStatus": "Expired",
      "nextNotificationDays": "60",
      "nextNotification": "",
      "inspectionType": "",
      "scheduleOutDays": ""
    }
  },
  "Licenses/Electrician/*/License": {
    "60 Day Notice": {
      "notificationTemplate": "SS_LICENSE_ABOUT_TO_EXPIRE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LICENSE_ABOUT_TO_EXPIRE",
      "updateExpirationStatus": "About to Expire",
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 30,
      "nextNotification": "30 Day Notice"
    },
    "30 Day Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_30_DAY_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXP_30_DAY_NOTICE",
      "updateExpirationStatus": false,
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 0,
      "nextNotification": "Expiration Notice"
    },
    "Expiration Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_FINAL_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXP_FINAL_NOTICE",
      "updateExpirationStatus": "Expired",
      "updateRecordStatus": "Expired",
      "updateWorkflowTask": "License Status",
      "updateWorkflowStatus": "Expired",
      "nextNotificationDays": "",
      "nextNotification": "",
      "inspectionType": "",
      "scheduleOutDays": ""
    }
  },
  "Licenses/Plumber/*/License": {
    "60 Day Notice": {
      "notificationTemplate": "SS_LICENSE_ABOUT_TO_EXPIRE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_ABOUT_TO_EXPIRE",
      "updateExpirationStatus": "About to Expire",
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 30,
      "nextNotification": "30 Day Notice"
    },
    "30 Day Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_30_DAY_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXP_30_DAY_NOTICE",
      "updateExpirationStatus": false,
      "updateRecordStatus": false,
      "updateWorkflowTask": false,
      "updateWorkflowStatus": false,
      "nextNotificationDays": 0,
      "nextNotification": "Expiration Notice"
    },
    "Expiration Notice": {
      "notificationTemplate": "SS_LIC_EXPIRATION_FINAL_NOTICE",
      "notificationReport": false,
      "notifyContactTypes": "Applicant",
      "mailerSetType": "Renewal",
      "mailerSetStatus": "Open",
      "mailerSetPrefix": "LIC_EXPIRATION_FINAL_NOTICE",
      "updateExpirationStatus": "Expired",
      "updateRecordStatus": "Expired",
      "updateWorkflowTask": "License Status",
      "updateWorkflowStatus": "Expired",
      "nextNotificationDays": "",
      "nextNotification": "",
      "inspectionType": "",
      "scheduleOutDays": ""
    }
  }
}