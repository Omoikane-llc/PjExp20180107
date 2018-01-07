using System;

public static void Run(string myQueueItem,out string outputBlob, TraceWriter log)
{
    log.Info($"C# Queue trigger function processed: {myQueueItem}");

    outputBlob = myQueueItem;
    
}
