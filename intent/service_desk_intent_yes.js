
const init = async (body)=>{
    let response_text = {}
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
                                ""
                            ]
                            }
                        }
                        ]
                    }
    return response_text

}
module.exports = {init:init}