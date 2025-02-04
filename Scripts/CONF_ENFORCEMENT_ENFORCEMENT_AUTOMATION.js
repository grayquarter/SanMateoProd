{
  "Enforcement/Property Maintenance/Case/NA": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create a new follow-up inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [],
          "inspectionResult": [
            "Citation",
            "Citation Referral",
            "Violation Notice",
            "Emergency Referral"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 15,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations"
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Property Maintenance/Site Visit/NA": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create a new site visit record with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [],
          "inspectionResult": [
            "Citation",
            "Citation Referral",
            "Violation Notice",
            "Emergency Referral"
          ]
        },
        "action": {
          "createNewRecord": [
            {
              "newRecordType": "Enforcement/Property Maintenance/Site Visit/NA",
              "newRecordStatus": "Pending",
              "newInspectionType": "Follow-Up",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 30,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - FENCE": {
                  "createWorkOrderType": "Enforcement/Incident/Zoning/Fence Dispute",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - GRAFFITI": {
                  "createWorkOrderType": "Enforcement/Incident/Abatement/Graffiti",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "cli@accela.com"
                    }
                  ]
                }
              },
              "connectWithParent": true
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Abandoned Vehicle": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Animal Nuisance (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Graffiti (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Noise Nuisance (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Trees (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Abatement/Weeds (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Building/Grading (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Building/Sub-Standard Property": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Building/Working Without Permit": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Building/Illegal Occupancy": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Health and Safety/Garbage Service (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Health and Safety/Junk (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Health and Safety/Vacant Building (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Zoning/Fence Dispute (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Zoning/Home Occupation (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Incident/Zoning/Illegal Sign (copy)": {
    "InspectionResultSubmitAfter": [
      {
        "preScript": "",
        "metadata": {
          "description": "Create new inspection with failed checklist items carried over",
          "operator": ""
        },
        "criteria": {
          "inspectionType": [
            "Initial Investigation"
          ],
          "inspectionResult": [
            "Citation",
            "In Violation"
          ]
        },
        "action": {
          "reInspectCurrentRecord": [
            {
              "newInspectionType": "Follow-Up Investigation",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 5,
              "carryOverFailedItems": true,
              "failedChecklistType": "Current Violations",
              "violationReferralRules": {
                "01A - BOARDING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Boarding/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "02A - CLEANING": {
                  "createWorkOrderType": "AMS/Property Maintenance/Cutting and Cleaning/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "080A - DEFACEMENT OF PROPERTY-Vacant": {
                  "createWorkOrderType": "AMS/Property Maintenance/Graffiti Abatement/NA",
                  "referralDaysOut": 14,
                  "emailReferrals": []
                },
                "05A - ILLEGALLY PARKED/ABANDONED VEH": {
                  "createWorkOrderType": "",
                  "referralDaysOut": 14,
                  "emailReferrals": [
                    {
                      "referralType": "Police",
                      "email": "awilliams@accela.com"
                    }
                  ]
                }
              }
            }
          ]
        },
        "postScript": ""
      }
    ]
  },
  "Enforcement/Property Maintenance/Project/NA": {
    "ApplicationSubmitAfter": [
      {
        "metadata": {
          "description": "When Case record is submitted, create the first site visit record with inspection scheduled",
          "operator": ""
        },
        "preScript": "",
        "criteria": {
          "customFields": {},
          "customLists": {}
        },
        "action": {
          "createNewRecord": [
            {
              "newRecordType": "Enforcement/Property Maintenance/Site Visit/NA",
              "newRecordStatus": "Pending",
              "newInspectionType": "New Complaint",
              "newInspectionStatus": "Scheduled",
              "newInspectionDaysOut": 0,
              "carryOverFailedItems": false,
              "failedChecklistType": "",
              "violationReferralRules": {}
            }
          ]
        },
        "postScript": ""
      }
    ]
  }
}