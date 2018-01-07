# PjExp20180107
Simple2stepAuthByEmail  
This is sample code snipets for learning, **never use for real production code.**  
This is quite simple idea.  

1st step
- 1st request to cloud from client
- publish key from sha256 pair to requested email address  
- publish value from sha256 pair to client (as hidden)  

2nd step  
- 2nd request with key copied from email from client (has hidden value) to cloud 
- check requested key and value by cloud  
- return success or fail to client from cloud  

Explanation of directries  
- 171025_HTMLApp  
Client application to send requests by Ajax  
- function2017121601  
Cloud appication on Azure to receive client 1st request  
This application generates sha256 pair  
- function2017121701  
Cloud appication on Azure to send email by SendGrid  
- function20171231  
Cloud appication on Azure to receive client 2nd request  
This application checks sha256 pair  
