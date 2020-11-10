

const getIntent=(intent)=>{
    
    if(intent.displayName=="get_employee_id"){
        const get_employee_id = require('./get_employee_id')
        return get_employee_id
    }
    else if(intent.displayName=="get_token"){
        const get_token = require('./get_token')
        return get_token
    }else if(intent.displayName=="issue-identifcation"){
        const issue_identification = require('./issue-identifcation')
        return issue_identification
    }
    else if(intent.displayName=="servicedesk-ticket-intent-yes"){
        const issue_identification = require('./service_desk_intent_yes')
        return issue_identification
    }
    else if(intent.displayName=="service-desk-ticket-no"){
        const issue_identification = require('./service_desk_intent_no')
        return issue_identification
    }
   
    else{
        const main = require('./main')
        return main
    }
    
}
module.exports = {
    getIntent:getIntent
}