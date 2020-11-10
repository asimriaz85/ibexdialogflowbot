const  {checkViberUser,
    checkUserExists,
    insertViberUser,
    inserToken,getToken,updateToken,getEmployeeBySession} = require('../services/users')
    const {sendEmail} = require('../services/email')
const init = async (body)=>{
        
        let { queryResult } = body;
        const { token } = queryResult.parameters;
        let session_token = false
        let response_text = {}
        if(token.toUpperCase()=='RESEND'){
            
            try{
                let tmp_token = 1234
                await updateToken(body.session,tmp_token)
                let employees = await getEmployeeBySession(body.session)
                if(employees.length>0){
                    await sendEmail(tmp_token,employees[0].email_address)
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
                                "We have resent your token. Please type in the token that you have received?"
                            ]
                            }
                        }
                        ]
                    }
            }catch(e){
                
            }
        }else{
            try{
                session_token = await getToken(body.session,token)
            }catch(e){
                
                session_token = false
            }

            if(session_token && session_token.length>0){
                let output_context = body.session+"/contexts/identify_problem"
                    response_text = {
                        "outputContexts":[
                            {
                                "name": output_context,
                                "lifespanCount": 5,
                            }

                        ],
                        //fulfillmentText: responseText,
                "followupEventInput": {
                    "name": "trigger-issue-identification",
                    "languageCode": "en-US",
                    },
                            "fulfillmentMessages": [
                            {
                                "text": {
                                "text": [
                                    "We have successfully verified your token. PLease now state what problem are you facing"
                                ]
                                }
                            }
                            ]
                        }
            }else{
                    
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
                                "Unable to verify the token. Can you please try again ?"
                            ]
                            }
                        }
                        ]
                    }
                    
            }
        }

 return response_text

}
module.exports = {init:init}