 'use strict';
 const {getAction} = require("./actions/index")
 const {getIntent} = require("./intent/index")

const getBody = async (body)=>{
  let respbody = {"message":null}
  let statusCode = 404
  let { queryResult } = body;
 
  if (queryResult) {
    try{
        
        const action = queryResult.action
        const intent = queryResult.intent
        //trying to get intent if defined
        
        if(typeof intent!="undefined"){
          const executeIntent = getIntent(intent)
         
          if(executeIntent){
             respbody = await executeIntent.init(body)
            
             if(respbody){
              statusCode=200
              return {respbody,statusCode}
             }
          }
        }
        //trying to get action if defined
        if(typeof action !="undefined"){
          const executeAction = getAction(action)
          if(executeAction){
              respbody = executeAction.init(body)
              statusCode = 200
              return {respbody,statusCode}
          }
        }
       respbody = {"message":"nothing found"}
       return {respbody,statusCode}
    }catch(e){
      
      respbody = {"message":"nothing found"}
      return {respbody,statusCode}
    }
  }
}

 const ibexbot = async (req)=>{
    const body = JSON.parse(req.body)
    
    if(body !=null){
      const {respbody,statusCode} = await getBody(body)
        return {
          statusCode: statusCode,
          body: JSON.stringify(
            respbody,
            null,
            2
          ),
        }
    }else{
      return {
        statusCode: 200,
        body: JSON.stringify(
          {message:"nothing found"},
          null,
          2
        ),
      }
    }



  
 }
module.exports.ibexbot = ibexbot
