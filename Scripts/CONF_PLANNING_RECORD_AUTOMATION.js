{
  "Planning/Pre-App Consult/NA/NA": {
    "WorkflowTaskUpdateAfter": [
      {
        "metadata": {
          "description": "Create parent Project record when needed",
          "operators": {}
        },
        "preScript": "",
        "criteria": {
          "task": [
            "Meeting"
          ],
          "status": [
            "Complete - Create Project"
          ]
        },
        "action": {
          "createParent": "Planning/Project/NA/NA"
        },
        "postScript": ""
      }
    ]
  }
}