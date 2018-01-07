using System.Net;
using System;
using System.Security.Cryptography;
using System.Text;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<string> outputQueueItem, TraceWriter log) {
    log.Info("C# HTTP trigger function processed a request.");

    // Get request body issue https://github.com/Azure/Azure-Functions/issues/379
    var data = await req.Content.ReadAsFormDataAsync();
    log.Info("data " + data);

    // Set name to query string or body data
    String name = data.GetValues("name").First();
    String email = data.GetValues("email").First();

    // Get randomPassCode
    byte[] bs = new byte[4];
    System.Security.Cryptography.RNGCryptoServiceProvider rng =
        new System.Security.Cryptography.RNGCryptoServiceProvider();
    rng.GetBytes(bs);
    var algorithm = new SHA256CryptoServiceProvider();
    byte[] result = algorithm.ComputeHash(bs);
    algorithm.Clear();
    var codeToMail = BitConverter.ToString(bs);
    var codeToWeb = BitConverter.ToString(result);

    outputQueueItem.Add("name=" + name + "&email=" + email + "&password" + codeToMail);
    //outputQueueItem.Add(data);

    log.Info("password" + codeToMail + "password hash" + codeToWeb);
    return email == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, new { error = "Please enter your email", response = "" })
        : req.CreateResponse(HttpStatusCode.OK, new { response = codeToWeb });
    //return req.CreateResponse(HttpStatusCode.OK, data);
}