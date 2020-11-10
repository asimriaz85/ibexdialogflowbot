"use strict";
const Restify = require("restify");
const server = Restify.createServer({
  name: "IBEXPSBOT"
});
const request = require("request");
const {getAction} = require("./actions/index")
const {getIntent} = require("./intent/index")
const PORT = process.env.PORT || 3000;

server.use(Restify.plugins.bodyParser());
server.use(Restify.plugins.jsonp());


// POST route handler
server.post("/", async (req, res, next) => {
  
  let { queryResult } = req.body;
  if (queryResult) {
    try{
        const { domain } = queryResult.parameters;
        const action = queryResult.action
        const intent = queryResult.intent

        //trying to get intent if defined
        if(typeof intent!="undefined"){
          const executeIntent = getIntent(intent)
          if(executeIntent){
            const json = await executeIntent.init(req,res)
            console.info(json)
            res.json(json)
            return next();
          }
        }

        //trying to get action if defined
        if(typeof action !="undefined"){
          const executeAction = getAction(action)
        
          if(executeAction){
              const json = executeAction.init(req,res)
              res.json(json)
              return next()
          }
        }

        //trying to get domain if defined
        if(typeof domain !="undefined"){
          const domain_methods = require('./domains/'+domain+'.js')
          const json = domain_methods.generate_response(req,res,queryResult.parameters);
          res.json(json)
          return next();
         }else{
              //console.info(queryResult)
        }
        
    }catch(e){
      console.info(e)
    }
  }
  return next();
});

server.listen(PORT, () => console.log(`Chatbot running on ${PORT}`));





//gcloud builds submit --tag gcr.io/ibex-ps-h9pq/dialogflow-viber
// https://accounts.google.com/o/oauth2/auth?client_id=32555940559.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8085%2F&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fappengine.admin+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcompute+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth&code_challenge=zkdib5EzOcA3UtabXMITq613WSFJWfbFZewGUtQ6NoM&code_challenge_method=S256&access_type=offline&response_type=code&prompt=select_account



//gcloud beta run deploy --image gcr.io/ibex-ps-h9pq/dialogflow-viber --update-env-vars GOOGLE_APPLICATION_CREDENTIALS=ibex.json --memory 1Gi