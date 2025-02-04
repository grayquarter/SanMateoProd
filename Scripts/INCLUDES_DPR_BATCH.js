(function () {
    var a = 1;
})();
Dpr.Actions.setConfig({
    notifications: {
        default: {
            emails: {
                fileValidationIssuesReminder: {
                    // Any overrides
                }
            }
        }
    },
    batch: {
        runs: {
            fileValidationIssuesReminder: {
                job: Dpr.Batch.SEND_NOTIFICATIONS,
                parameters: {
                    module: "Building",
                    email: Dpr.Actions.FILE_VALIDATION_ISSUES_REMINDER_NOTIFICATION,
                    taskNames: ["Application Submittal", "Plans Distribution"],
                    taskStatus: "File Validation Issues",
                    excludedAppStatuses: ["Void", "Withdrawn"],
                    intervals: [1,3,7],
                    onlineOnly: true,
                    resultRecipient: "batch_results@epermithub.com"
                }
            },
            archivePendingFiles: {
                job: Dpr.Batch.ARCHIVE_PENDING_FILES,
                parameters: {
					pause: 1000, // in milliseconds
                    daysBehind: 5, // days
                    timeWithin: 600000, // milliseconds 3600000 = 1 hour
                    resultRecipient: "batch_results@epermithub.com"
				}
            },
            archivePendingPrintSets: {
                job: Dpr.Batch.ARCHIVE_PENDING_PRINTSETS,
                parameters: {
					pause: 1000, // in milliseconds
                    daysBehind: 5, // days
                    timeWithin: 600000, // milliseconds 3600000 = 1 hour
                    resultRecipient: "batch_results@epermithub.com"
				}
            },
            bld_notApprovedNoOpenIssues: {
                job: Dpr.Batch.NOT_APPROVED_NO_OPEN_ISSUES,
                parameters: {
                    excludedAppStatuses: ["Void", "Withdrawn"],
                    modules: ["Building"],
                    resultRecipient: "batch_results@epermithub.com"
                }
            }
        }
    }
});