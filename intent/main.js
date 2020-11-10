const  {checkViberUser,
    checkUserExists,
    insertViberUser,
    inserToken,getToken} = require('../services/users')

const {getContext,checkLastContexts} = require('../services/utilities')
     
const init = async (body)=>{
    try{
        
        let isSendServiceDeskEmail = checkLastContexts(body,"send_ticket_to_servicedesk")
        let isIssueRsolvedSuccessfully = checkLastContexts(body,"issue_resolved")
        if(isSendServiceDeskEmail){
            
            let output_context = body.session+"/contexts/identify_problem"
            response_text = {
                "outputContexts":[
                    {
                        "name": output_context,
                        "lifespanCount": 5,
                    }

                ],
            
            "followupEventInput": {
            "name": "trigger-issue-identification",
            "languageCode": "en-US",
            },
                    "fulfillmentMessages": [
                    {
                        "text": {
                        "text": [
                            "Sending you back to issue identification."
                        ]
                        }
                    }
                    ]
                }
                return response_text
        }else if(isIssueRsolvedSuccessfully){
            
            let output_context = body.session+"/contexts/identify_problem"
            response_text = {
                "outputContexts":[
                    {
                        "name": output_context,
                        "lifespanCount": 5,
                    }

                ],
            
            "followupEventInput": {
            "name": "trigger-issue-identification",
            "languageCode": "en-US",
            },
                    "fulfillmentMessages": [
                    {
                        "text": {
                        "text": [
                            "Sending you back to issue identification."
                        ]
                        }
                    }
                    ]
                }
                return response_text
        }
        return body
    }catch(e){
       console.info(e)
        return body
    }
}


module.exports = {init:init}