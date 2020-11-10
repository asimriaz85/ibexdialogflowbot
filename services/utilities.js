const getContext = (body,contextname)=>{
    let rtn = false
    try{
        let {outputContexts} = body.queryResult
        outputContexts.forEach((el)=>{
            
            let context_split =     el.name.split("/")
            let crnt_context_name = context_split[context_split.length-1]
            if(crnt_context_name==contextname){
                rtn  = el;
            }     

    })
    }catch(e){
        
        rtn =  false
    }
    return rtn
}
const getContextAndIndex = (body,contextname)=>{
    let rtn = [false,false]
    try{
        let {outputContexts} = body.queryResult
        outputContexts.forEach((el,index)=>{
            
            let context_split =     el.name.split("/")
            let crnt_context_name = context_split[context_split.length-1]
            if(crnt_context_name==contextname){
                rtn  = [el,index];
            }     

    })
    }catch(e){
        
        rtn =  [false,false]
    }
    return rtn
}
const checkLastContexts = (body,contextname)=>{
    try{
            let {outputContexts} = body.queryResult
            let context_split = outputContexts[0].name.split("/")
            let last_context_name = context_split[context_split.length-1]
            console.info(outputContexts[0].name)
            if(last_context_name==contextname){
                return true;
            }
            
    }catch(e){
            return false
    }
}  

const checkLastContextsCount = (body,contextname)=>{
    try{
            let {outputContexts} = body.queryResult
            let context_split = outputContexts[0].name.split("/")
            let last_context_name = context_split[context_split.length-1]
            console.info(last_context_name)
            if(last_context_name==contextname){
                    return outputContexts[0].lifespanCount
            }
            
    }catch(e){
            return false
    }
}  

module.exports = {
    "getContext":getContext,
    "checkLastContexts":checkLastContexts,
    "checkLastContextsCount":checkLastContextsCount,
    "getContextAndIndex":getContextAndIndex
}