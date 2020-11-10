
const init = (body)=>{
             

            const response_text = {
                "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Text response from webhook"
                      ]
                    }
                  }
                ]
              }
              return response_text
           
}
module.exports = {init:init}