const init = (body)=>{
    try{
       const {queryResult}  = body
       const response_text = {
            "fulfillmentMessages": [
                {
                "text": {
                    "text": [
                    "Unable to find any resoltion steps related to your problem. Forwarding your request to servicedesk"
                    ]
                }
                }
            ]
            }
        return response_text
        
    }catch(e){
        console.info(e)
        return body
    }
   return body
}
module.exports = {init:init}