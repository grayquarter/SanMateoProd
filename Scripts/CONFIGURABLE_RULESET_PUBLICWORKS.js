{
  "ApplicationSubmitAfter": {
    "StandardScripts": [
      "STDBASE_COPY_RECORD_DATA",
      "STDBASE_UPDATE_FIELDS"
    ]
  },
  "InvoiceFeeAfter": {  
    "StandardScripts": [ 
      "STDBASE_SEND_CONTACT_EMAILS"  
    ]
  },
  "WorkflowTaskUpdateBefore": {
    "StandardScripts": [
      "STDBASE_RECORD_VALIDATION"
    ]
  },
  "WorkflowTaskUpdateAfter": {
    "StandardScripts": [
      "STDBASE_PERMIT_ISSUANCE",
      "STDBASE_INSPECTION_SCHEDULING",
      "STDBASE_UPDATE_FIELDS",
      "STDBASE_COPY_RECORD_DATA",
      "STDBASE_LICENSE_RENEWAL_ISSUANCE",
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  },
  "InspectionResultSubmitAfter": {
    "StandardScripts": [
      "STDBASE_INSPECTION_AUTOMATION",
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  },
  "InspectionScheduleAfter": {
    "StandardScripts": [
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  },
  "InspectionScheduleBefore": {
    "StandardScripts": [
      "STDBASE_RECORD_VALIDATION"
    ]
  },
  "V360InspectionResultSubmitAfter": {
    "StandardScripts": [
      "STDBASE_INSPECTION_AUTOMATION",
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  }
}