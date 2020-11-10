
const getTrigger= (domain,subdomain,error)=>{
            domain = domain.replace(/ /g, "_");
            error = error.replace(/ /g, "_");
            return "trigger_"+domain+"_"+error
}
const getContext =()=>
{
    return "problem_identified"
}
module.exports = {
    generate_response:(body,params)=>{
        const {domain,aws_subdomains,aws_errors} = params
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
                    "domain": domain,
                    "subdomain":aws_subdomains,
                    "error":aws_errors
                }
        },
        "outputContexts": [
                {
                    "name": output_context,
                    "lifespanCount": 5,
                    "parameters": {
                        "domain": domain,
                        "subdomain":aws_subdomains,
                        "error":aws_errors
                    }
                }
            ],
        };
        
        return respObj
    }
}