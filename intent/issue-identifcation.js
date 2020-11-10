const  {checkViberUser,
    checkUserExists,
    insertViberUser,
    inserToken,getToken} = require('../services/users')
const {getContext,getContextAndIndex,checkLastContexts,checkLastContextsCount} = require('../services/utilities')
const init = async (body)=>{
    try{
        
        const {queryResult} = body
        const { domain,aws_subdomains,aws_errors } = queryResult.parameters;
        
        if(domain && domain!="" && aws_errors!="" && aws_errors!=null){
            const domain_methods = require('../domains/main')
            respbody = domain_methods.generate_response(body,queryResult.parameters);
            return respbody
        }else if((domain==null || domain=="") && (aws_errors==null || aws_errors=="")){
            
            let [triggered,triggered_index] = getContextAndIndex(body,"trigger-issue-identification")
            body["fulfillmentMessages"] = [
               
                {
                    "text": {
                        "text": [
                            " How can I help you today? Can you please mention what platform are you facing this issue on ? Quartz, AWS, Hardware"
                        ]
                    }
                }
                
            ]

            let [servicedesk_context,sd_ctx_index] = getContextAndIndex(body,"send_ticket_to_servicedesk")
            let [issue_resolved,issue_resolved_idx] = getContextAndIndex(body,"issue_resolved")
            if(triggered && (servicedesk_context|| issue_resolved)){
                let params = {} 
                let text_body = ""
                console.info(issue_resolved.parameters)
                
                if(issue_resolved && servicedesk_context ==false || 
                    ( issue_resolved && servicedesk_context && 
                        issue_resolved_idx < sd_ctx_index)
                    ){
                    params = issue_resolved.parameters
                    text_body = " Do you have any other issue I can help you with today ?"
                }else{
                    params = servicedesk_context.parameters
                    text_body = "Sending ticket to servicedesk. Do you have any other issue I can help you with today ?"
                }
                if(typeof params.body!="undefined" && params.body !="" ){
                    text_body = params.body
                }
                body["fulfillmentMessages"] = [
               
                    {
                        "text": {
                            "text": [
                                text_body
                            ]
                        }
                    }
                    
                ]
            }
            
        }
        
        return body
    }catch(e){
        console.info(e)
        return false
    }
}
module.exports = {init:init}