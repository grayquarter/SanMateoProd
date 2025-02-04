{
  "Building/Commercial/Accessory/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Addition/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [
            "General Contractor"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Alteration/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [
            "General Contractor"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Demolition/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Electrical/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Foundation/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [
            "General Contractor"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Mechanical/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/New/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [
            "General Contractor"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Plumbing/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/PoolSpa/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/Roofing/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Communication Facility/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Grading/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Parking Lot/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Addition/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Alteration/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Demolition/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Electrical/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Foundation/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Mechanical/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/New/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Plumbing/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/PoolSpa/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Sign/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Temporary Structure/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Elevator/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Commercial/SolarPV/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Accessory/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/Roofing/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Application Intake"
          ],
          "status": [
            "Accepted - Plan Review Req"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Residential/SolarPV/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Inspection"
          ],
          "status": [
            "Final Inspection Complete"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  },
  "Building/Tiny House/NA/NA": {
    "WorkflowTaskUpdateBefore": [
      {
        "metadata": {
          "description": "Before the plans are routed for review, required licensed professional(s) must be listed on the record and all listed licensed professionals must have valid licenses.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "requiredLP": [],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because 1) a required licensed professional is not listed, or 2) one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before plans are routed for review",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Plans Distribution"
          ],
          "status": [
            "Routed for Review"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Licensed professionals must be validated before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "validateLP": true
        },
        "action": {
          "validationMessage": "This action cannot be taken because one or more of the licensed professionals has an expired license."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before a permit can be issued.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "All invoiced fees must be paid before an application/permit can be closed. ",
          "operator": ""
        },
        "criteria": {
          "task": [
            "Certificate of Occupancy"
          ],
          "status": [
            "Final CO Issued",
            "Not Required"
          ],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ],
    "InspectionScheduleBefore": [
      {
        "metadata": {
          "description": "All invoiced fees must paid before an inspection can be scheduled.",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [],
          "allowBalance": false
        },
        "action": {
          "validationMessage": "This action cannot be taken until all invoiced fees are paid in full."
        }
      }
    ]
  }
}