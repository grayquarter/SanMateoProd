//ASA:Building/Residential/New/NA

try {
    if (AInfo["Total Building Area (Sq. Ft)"] < 1500) {
        updateFee("FIREIMP002", "BLDG_RES_NEW", "FINAL", AInfo["Number of Dwelling Units"], "Y");
    }

    if (AInfo["Total Building Area (Sq. Ft)"] >= 1500 && AInfo["Total Building Area (Sq. Ft)"] < 2500) {
        updateFee("FIREIMP003", "BLDG_RES_NEW", "FINAL", AInfo["Number of Dwelling Units"], "Y");
    }

    if (AInfo["Total Building Area (Sq. Ft)"] >= 2500) {
        updateFee("FIREIMP004", "BLDG_RES_NEW", "FINAL", AInfo["Number of Dwelling Units"], "Y");
    }
    
}

catch (err){
    	logDebug("An error has occurred in ASA:Building/Residential/New/NA: failed to add impact fees" + err.message);
}