{
  "PublicWorks/Curb Cut/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Curb Cut Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Driveway/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Driveway Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Fiber and Cable/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Fiber and Cable Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Sewer Connection/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Sewer Connection Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Street Cut/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Street Cut Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Special Event/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Post-Event Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Dumpster/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Dumpster Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Traffic Control/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Traffic Control Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Banner/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Banner Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Loading Zone/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Loading Zone Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      }
    ]
  },
  "PublicWorks/Small Cell/NA/NA": {
    "InspectionResultSubmitAfter": [
      {
        "metadata": {
          "description": "Forward workflow when a final inspection is complete.",
          "operators": ""
        },
        "preScript": "",
        "criteria": {
          "inspectionTypePerformed": [
            "Small Cell Final Inspection"
          ],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "taskName": "Inspection",
          "taskStatus": "Final Inspection Complete"
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update expiration date to 180 days from present date when any inspection has a Passed result",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "Expiration Code",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      },
      {
        "preScript": "",
        "metadata": {
          "description": "Update custom field Permit Expiration Date upon Passed result of an inspection",
          "operators": ""
        },
        "criteria": {
          "inspectionTypePerformed": [],
          "inspectionResult": [
            "Passed"
          ]
        },
        "action": {
          "expirationTypeUpdate": "ASI:Permit Expiration Date",
          "expirationDaysToAdvance": 180
        },
        "postScript": ""
      }
    ]
  }
}