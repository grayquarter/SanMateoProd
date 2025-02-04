if(wfTask == "Communication" && wfStatus == "Sent") {
    
    //dropdown item as notification template : system batch job name
    var batchMap = {
        "LICENSE_HOLDER_COMMUNICATION" : "DCC_DEMO_LICENSE_HOLDER_EMAIL"
    }

    var ejbProxy = aa.proxyInvoker.newInstance("com.accela.aa.util.EJBProxy").getOutput();
    var batch = ejbProxy.getBatchEngineService();
    aa.print(batch.executeBatchJobByName(aa.getServiceProviderCode(),batchMap[AInfo["Send Notification"]]));
    updateAppStatus("Sent","Communication Sent: " + batchMap[AInfo["Send Notification"]]);
}