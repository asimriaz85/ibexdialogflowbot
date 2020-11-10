
const  {checkViberUser,
        checkUserExists,
        insertViberUser,
        inserToken} = require('../services/users')
const {sendEmail} = require('../services/email')
var randtoken = require('rand-token');

  
var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-east-1'});

const init = async (body)=>{
   console.info("in employee verification body")
   let { queryResult } = body;
   const { employeeid } = queryResult.parameters;
   let user_record = false
   let response_text = {}
   console.info(employeeid)
   try{
       user_record = await checkUserExists(employeeid)
   }catch(e){
     console.info(e)
       user_record = false
   }

   if(user_record && user_record.length>0){
          
          try{
              // var token = randtoken.generate(5);
              var token = 1234
              await inserToken(body.session,token,employeeid)
              await sendEmail(token,user_record[0].email_address)
          }catch(e){
              console.info(e)
          }
          let output_context = body.session+"/contexts/get_token"
              response_text = {
                  "outputContexts":[
                      {
                          "name": output_context,
                          "lifespanCount": 5,
                      }
                  ],
                  "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "We have sent an email to your registered email address . Please type the token shared on the email. If you have not received the email please type resend. "
                        ]
                      }
                    }
                  ]
                }
   }else{
    
    let output_context = body.session+"/contexts/get_employee_id"
    response_text = {
        "outputContexts":[
            {
                "name": output_context,
                "lifespanCount": 5,
            }
        ],
         "fulfillmentMessages": [
          {
            "text": {
              "text": [
                "Pleae type in the correct employee id. System is unable to find any record against this employee id"
              ]
            }
          }
        ]
      }
     
   }
    console.info(response_text)
     return response_text
  
}
module.exports = {init:init}