using System.Net;
using System;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<string> outputQueueItem, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");


    // Get request body issue https://github.com/Azure/Azure-Functions/issues/379
    //dynamic data = await req.Content.ReadAsAsync<object>();
    var data = await req.Content.ReadAsFormDataAsync();
    log.Info("data " + data);

    // Set name to query string or body data
    String email = data.GetValues("inputEmail").First();
    String message = data.GetValues("inputMessage").First();
    log.Info("\r\n" + "inputEmail " + email + "\r\n" + "inputMessage " + message);

    outputQueueItem.Add("apexamcontact" + " test" + email + "\r\n" + message);

    return email == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Please input your email address")
        : req.CreateResponse(HttpStatusCode.OK, email + ", Thank you for your message.");
}
