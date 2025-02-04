{
  "PublicWorks/Curb Cut/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Driveway/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Fiber and Cable/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Sewer Connection/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Street Cut/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Special Event/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Dumpster/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Traffic Control/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Banner/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Loading Zone/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Small Cell/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionScheduleAfter": [
      {
        "metadata": {
          "description": "Send notification when inspection is scheduled",
          "operators": {}
        },
        "preScript": "",
        "criteria": {},
        "action": {
          "notificationTemplate": "SS_INSPECTION_SCHEDULED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ],
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Send notification when an inspection is resulted",
          "operators": {}
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": []
        },
        "action": {
          "notificationTemplate": "SS_INSPECTION_RESULTED",
          "notificationReport": [
            "Inspection Result Ticket"
          ],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Valet/Short-Term/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Valet/Long-Term/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when any permit status , with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Status"
          ],
          "status": []
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_STATUS",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Over-Dimension/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Meter Bagging/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Accessible Parking/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when any permit status , with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Status"
          ],
          "status": []
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_STATUS",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Sidewalk Use/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when any permit status , with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Status"
          ],
          "status": []
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_STATUS",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Valet/Long-Term/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit no Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Sidewalk Use/NA/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Accessible Parking/NA/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "action": {
          "notificationTemplate": "SS_PERMIT_ISSUANCE",
          "notificationReport": [
            "PublicWorks Permit with Address"
          ],
          "reportParamContactType": "Applicant",
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/ADA Curb Ramp/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send notification when additional information is required",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Additional Info Required"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ADDITIONAL_INFO_REQD",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is denied",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Denied"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_DENIED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when application is withdrawn",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [],
          "status": [
            "Withdrawn"
          ]
        },
        "action": {
          "notificationTemplate": "SS_APP_WITHDRAWAL",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Send notification when permit is issued, with permit form attached",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Decision"
          ],
          "status": [
            "Approved"
          ]
        },
        "action": {
          "notificationTemplate": "SS_REQUEST_APPROVED",
          "notificationReport": [],
          "notifyContactTypes": [
            "Applicant",
            "Authorized Agent"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false,
          "reportingInfoStandards": ""
        },
        "postScript": ""
      }
    ]
  }
}