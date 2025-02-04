{
  "Building/Commercial/Accessory/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Addition/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Alteration/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Demolition/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Electrical/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Foundation/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Mechanical/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/New/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Plumbing/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/PoolSpa/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/Roofing/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Communication Facility/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Grading/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Parking Lot/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Addition/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Alteration/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Demolition/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Electrical/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Foundation/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Mechanical/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/New/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Plumbing/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/PoolSpa/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Sign/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Temporary Structure/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Elevator/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Commercial/SolarPV/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Accessory/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/Roofing/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Residential/SolarPV/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Damage Assessment/NA/NA": {
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  },
  "Building/Tiny House/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Issued Date upon permit issuance ",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Issuance"
          ],
          "status": [
            "Issued"
          ]
        },
        "action": {
          "daysOut": "0",
          "customFieldToUpdate": "Permit Issued Date"
        },
        "postScript": ""
      },
      {
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon permit issuance ",
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
          "daysOut": "180",
          "customFieldToUpdate": "Permit Expiration Date"
        },
        "postScript": ""
      }
    ],
    "ApplicationSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Application Expiration Date when application is received",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "daysOut": "180",
          "customFieldToUpdate": "Application Expiration Date"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update the application name to be the address",
          "operators": {}
        },
        "criteria": {},
        "action": {
          "updateAppName": {
            "includeAddress": true,
            "addressType": "",
            "contactType": "Applicant",
            "includeContactName": true,
            "includeBusinessName": false,
            "includeDBATradeName": false
          }
        },
        "postScript": ""
      }
    ]
  }
}