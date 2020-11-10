
const resetContexts = (body)=>{
    let rtn_contexts = []
    try{
        let {outputContexts} = body.queryResult
        outputContexts.forEach((el)=>{
            el.lifespanCount=0
            rtn_contexts.push(el)
    })
    }catch(e){
    }
    return rtn_contexts
}
const init = async (body)=>{
    let response_text = {}
                let output_contexts = resetContexts(body)
                response_text = {
                    "outputContexts":output_contexts,
                    "fulfillmentMessages": [
                        {
                            "text": {
                            "text": [
                                "Thanks. See you again"
                            ]
                            }
                        }
                        ]
                    }
    return response_text

}
module.exports = {init:init}