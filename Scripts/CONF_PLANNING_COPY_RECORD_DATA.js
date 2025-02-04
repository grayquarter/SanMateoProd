{
    "Planning/Home Occupation/NA/Renewal": {
      "Pageflow": [
        {
          "preScript": "",
          "metadata": {
            "description": "Copy Contact Info from parent record to amendment record",
            "operators": {}
          },
          "criteria": {
            "recordType": "Planning/Home Occupation/NA/NA"
          },
          "action": {
            "usageType": "copyFromParent",
            "Renewal": true,
            "CONTACTS": [
              "ALL"
            ],
            "ASI": [
              "ALL"
            ],
            "ASIT": [
              "ALL"
            ],
            "CONDITIONS": [
              "ALL"
            ],
            "ADDRESS": [],
            "LICENSEDPROFESSIONALS": [],
            "ASSETS": [],
            "keepExistingAPO": false,
            "RECORDDETAILS": true,
            "RECORDNAME": true,
            "PARCEL": false,
            "OWNER": false,
            "ADDITIONALINFO": false,
            "EDUCATION": false,
            "CONTEDUCATION": false,
            "EXAM": false,
            "DOCUMENT": false
          },
          "postScript": ""
        }
      ],
      "ApplicationSubmitAfter": [
        {
          "metadata": {
            "description": "Copy data from License to Renewal",
            "operators": {}
          },
          "preScript": "",
          "criteria": {
            "recordType": "Planning/Home Occupation/NA/NA"
          },
          "action": {
            "usageType": "copyFromParent",
            "Renewal": true,
            "CONTACTS": [
              "ALL"
            ],
            "ASI": [
              "ALL"
            ],
            "ASIT": [
              "ALL"
            ],
            "CONDITIONS": [
              "ALL"
            ],
            "ADDRESS": [],
            "keepExistingAPO": true,
            "RECORDDETAILS": true,
            "RECORDNAME": true,
            "PARCEL": false,
            "OWNER": false,
            "ADDITIONALINFO": false,
            "EDUCATION": false,
            "CONTEDUCATION": false,
            "EXAM": false,
            "DOCUMENT": false
          },
          "postScript": ""
        }
      ]
    }
  }