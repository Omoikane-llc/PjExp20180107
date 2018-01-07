using System.Net;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using System.Collections.Generic;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");
    var isPassCodeOK = false;

    // Get request body issue https://github.com/Azure/Azure-Functions/issues/379
    var data = await req.Content.ReadAsFormDataAsync();
    log.Info("data " + data);
    String refCode = data.GetValues("refCode").First();
    String inputCode = data.GetValues("inputCode").First();

    // generate hash from inputCode
    byte[] bs = new byte[4];
    var inputs = inputCode.Split('-');
    for(int i = 0; i < inputs.Length; i++) {
        bs[i] = Convert.ToByte(inputs[i], 16);
    }
    var algorithm = new SHA256CryptoServiceProvider();
    var result = BitConverter.ToString(algorithm.ComputeHash(bs));
    algorithm.Clear();
    log.Info("refCode " + refCode);
    log.Info("result  " + result);
    isPassCodeOK = (refCode.Equals(result));
    log.Info("isPassCodeOK " + isPassCodeOK);

    return isPassCodeOK
        ? req.CreateResponse(HttpStatusCode.OK, new { response = "Collect request " + inputCode })
        : req.CreateResponse(HttpStatusCode.BadRequest, new { response = "Bad passCode request" });
}
