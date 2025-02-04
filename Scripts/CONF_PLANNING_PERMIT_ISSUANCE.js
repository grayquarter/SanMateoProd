{
  "Planning/Home Occupation/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Issues a Permit with the expirations date set to 180 days from the current date",
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
          "issuedStatus": "Active",
          "expirationStatus": "Active",
          "expirationDaysOut": 365
        },
        "postScript": ""
      }
    ]
  },
  "Planning/Floodplain Development/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Issues a Permit with the expirations date set to 180 days from the current date",
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
          "issuedStatus": "Active",
          "expirationStatus": "Active",
          "expirationDaysOut": 180
        },
        "postScript": ""
      }
    ]
  }
}