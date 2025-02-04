{
  "PublicWorks/Valet/Long-Term/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent Valet record",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "Active",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
          "expirationType": "Expiration Date",
          "expirationPeriod": 365,
          "customExpirationFunction": "",
          "copyComponents": [
            "Custom Fields"
          ]
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Sidewalk Use/NA/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent record",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "Active",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
          "expirationType": "Expiration Date",
          "expirationPeriod": 365,
          "customExpirationFunction": "",
          "copyComponents": [
            "Custom Fields"
          ]
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Accessible Parking/NA/Renewal": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Updates parent record",
          "operators": {}
        },
        "criteria": {
          "task": [
            "Permit Renewal"
          ],
          "status": [
            "Renewed"
          ]
        },
        "preScript": "",
        "action": {
          "issuedRecordStatus": "Active",
          "issuedExpirationStatus": "Active",
          "issuedLPStatus": "A",
          "expirationType": "Expiration Date",
          "expirationPeriod": 365,
          "customExpirationFunction": "",
          "copyComponents": [
            "Custom Fields"
          ]
        },
        "postScript": ""
      }
    ]
  }
}