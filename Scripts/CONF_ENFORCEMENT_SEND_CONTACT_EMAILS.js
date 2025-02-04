{
  "Enforcement/Incident/*/*": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Send first Notice of Violation upon workflow update",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Initial Investigation"
          ],
          "status": [
            "In Violation"
          ]
        },
        "action": {
          "notificationTemplate": "SS_ENFORCEMENT_VIOLATION_NOTICE",
          "notificationReport": [
            "Notice of Violation - First Notice"
          ],
          "notifyContactTypes": [
            "Property Owner"
          ],
          "additionalEmailsTo": "",
          "url4ACA": "",
          "createFromParent": false
        },
        "postScript": ""
      }
    ]
  }
}