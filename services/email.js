var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-east-1'});
const sendEmail = (token,email)=>{ 
        return new Promise((resolve,reject)=>{
                  var params = {
                    Destination: {
                        ToAddresses: [email]
                    },
                    Message: {
                        Body: {
                            Text: { Data: "Please type in this token " +token
                                
                            }
                            
                        },
                        Subject: { 
                          Data: "Verify Token"
                        }
                    },
                    Source: "asimriaz85@gmail.com"
                };
                ses.sendEmail(params, function (err, data) {
                    // callback(null, {err: err, data: data});
                    if (err) {
                          console.info('Email not sent')
                          console.info(err)
                          reject("Email not sent")
                    } else {
                        console.info("email sent")
                        resolve("Email Sent")
                    }
                });
        });
}
module.exports={
    "sendEmail":sendEmail
}