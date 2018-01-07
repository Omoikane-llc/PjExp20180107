#r "SendGrid"
using System;
using SendGrid.Helpers.Mail;

public static void Run(TraceWriter log, string myQueueItem, out Mail message) {
    log.Info($"C# Queue trigger function processed: {myQueueItem}");

    message = new Mail {        
        Subject = "Azure 2step Auth test"          
    };

    var personalization = new Personalization();
    // change to email of recipient
    char delimiter = '&';
    string[] queItemParams = myQueueItem.Split(delimiter);
    string emailAddress = null;
    foreach(var param in queItemParams) {
        if(param.StartsWith("email") && param.Contains("=")) {
            emailAddress = param.Substring(param.IndexOf("=") + 1);
        }
    }
    var DEFAULT_SEND_ADDRESS = ConfigurationManager.AppSettings.Get("DEFAULT_SEND_ADDRESS");
    personalization.AddTo(new Email(emailAddress == null ? DEFAULT_SEND_ADDRESS : emailAddress));

    Content content = new Content {
        Type = "text/plain",
        Value = myQueueItem
    };
    message.AddContent(content);
    message.AddPersonalization(personalization);
    log.Info("send email to " + emailAddress);
    
}