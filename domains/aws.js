const domain="aws"
const errors = {
        "username":{
            "trigger":"trigger_aws_authentication_username",
            "subdomain":"authentication"
        },
        "password":{
            "trigger":"trigger_aws_authentication_password",
            "subdomain":"authentication"
        }
        ,
        "duo":{
            "trigger":"trigger_aws_authentication_duo",
            "subdomain":"authentication"
        }

}

let contextName = ""
let followUpContext = {"outputContexts": [
    {
      "name": "projects/project-id/agent/sessions/ibex-ps-h9pq/contexts/"+contextName,
      "lifespanCount": 5,
      "parameters": {
        "param-name": "param-value"
      }
    }
  ]
  }

const getTrigger= (domain,subdomain,error)=>{
            if(typeof errors[error] !="undefiend"){
                return errors[error].trigger
            }
}
const getContext =()=>
{
    return "problem_identified"
}
module.exports = {
    generate_response:(body,params)=>{
        const {aws_subdomains,aws_errors} = params
        const context = getContext()
        const trigger = getTrigger(domain,aws_subdomains,aws_errors)
        let output_context = body.session+"/contexts/"+context
        let responseText =  "You have selected"+domain
        let respObj = {
            //fulfillmentText: responseText,
            "followupEventInput": {
            "name": trigger,
            "languageCode": "en-US",
            "parameters": {
            "domain": domain
            }
        },
            "outputContexts": [
            {
                "name": output_context,
                "lifespanCount": 5,
                "parameters": {
                "domain": domain
                }
            }
            ],
        
        };
        console.info(respObj)
        return respObj
    }
}