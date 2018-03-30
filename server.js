var soap = require('soap');
var express = require('express');
var app = express();
var morgan = require('morgan');
var rp = require('request-promise');
var twilio = require('twilio');
app.use(morgan('dev'));
/**
-this is remote service defined in this file, that can be accessed by clients, who will supply args
-response is returned to the calling client
-our service UploadService  by calling UploadDocuments, GetStatus, GetStatusExt methods through port:UploadServiceSoap
**/

var service = {
    UploadService : {
        UploadServiceSoap :{
            UploadDocuments:function(args,callback){
              console.log(args);
              var username = args.UploadData.Username;
              var password = args.UploadData.Password;
              var obj;
              var options = {
                  method: 'POST',
                  uri: 'https://cloudapps.services/rest/api/login?output=json',
                  body: {
                      some: 'payload'
                  },
                  headers:{'content-type':'application/json','loginName':'restapitih','password':'Mnbvcxz!!'},
                  json: true // Automatically stringifies the body to JSON
              };

                // rp(options)
                //    .then(function (response) {
                //     // POST succeeded...
                //     console.log(response);
                //     callback(response);
                //    })
                //    .catch(function (err) {
                //     // POST failed...
                //     console.log(err);
                // })
          var obj = {Success:1,Klaar:1,EigenKenmerk:'EigenKenmerk',ServiceRequested:'ServiceRequested',PI_Kenmerk:'PI_Kenmerk',MetPartner:true,TijdStempel:'2018-09-03',ServerKenmerk:'7584dfd',FoutMelding:'dfh'};
                  callback(obj);
            }
        }
   }
}

// xml data is extracted from wsdl file created
var xml = require('fs').readFileSync('./uploadService.wsdl','utf8');
//create an express server and pass it to a soap server
var server = app.listen(3030,function(){
var host = "127.0.0.1";
var port = server.address().port;
console.log("server is running on port: "+port);
});

app.post('/xml', function(req, res, next){
     var resp = new twilio.twiml.VoiceResponse();

    resp.say({voice:'alice'}, 'Please check the alert box');
    resp.pause({length:'1'});
    resp.say({voice:'alice'}, 'Please contact us if you need any assistance');

    res.type('text/xml');

    res.send(resp.toString());
});

soap.listen(server,'/uploadservice',service,xml);
