var myAltId = "24TMP-000495";
var tCapId = aa.cap.getCapID(myAltId).getOutput();
var deleteResult = aa.cap.deletePartialCAP(tCapId);
                    if (deleteResult.getSuccess()) {
                        aa.print("  Successfully deleted.");
                    }
                    else {
                        aa.print("  err deleting temp app: " + deleteResult.getErrorMessage());
                    }