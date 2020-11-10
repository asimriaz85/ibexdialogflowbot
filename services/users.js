
var mysql = require('mysql');
let  conn = mysql.createConnection({
    host: "ibex-bot-dev.c7cd27omhrad.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Abdullahpakistan1",
    "port":3306,
    "database":"ibex_bot_viber"
  });
// let  conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     "port":1336,
//     "database":"ibex_bot_viber"
//   });

  const checkUserExists = (employee_id)=>new Promise((resolve, reject) => {
      
    conn.query("SELECT * from users_ibex where employee_id='"+employee_id+"'", function (error, results, fields) {
        if (error) {
            console.info(error)
            reject("Exception")
        }
        resolve(results)
      });

});

const checkViberUser = (viber_id)=>new Promise((resolve, reject) => {
      
    conn.query("SELECT * from users_viber where viber_id='"+viber_id+"'", function (error, results, fields) {
        if (error) {
            reject("Exception")
        }
        resolve(results)
      });

});

const insertViberUser = (viber_id,employee_id)=> new Promise(
    (resolve,reject)=>{
        var sql = "INSERT INTO users_viber (employee_id, viber_id) VALUES ('"+employee_id+"', '"+viber_id+"')";
        conn.query(sql, function (err, result) {
          if (err) {
              reject(err)
          }else{
              resolve("Added")
          }
        });
    }

);

const getToken = (session_id,token)=>new Promise((resolve, reject) => {
      
    conn.query("SELECT * from employee_token where session_id='"+session_id+"' and token='"+token+"'", function (error, results, fields) {
        if (error) {
            console.info(error)
            reject("Exception")
        }
        resolve(results)
      });

});
const deleteToken = (session_id)=>new Promise((resolve, reject) => {
      
    conn.query("delete  from employee_token where session_id='"+session_id+"'", function (error, results) {
        if (error) {
            console.info(error)
            reject("Exception")
        }
        resolve(results)
      });

});
const insertToken =  (session_id,token,employee_id)=> new Promise(
    async (resolve,reject)=>{
        await deleteToken(session_id)
        var sql = "INSERT INTO employee_token (session_id, token,employee_id) VALUES ('"+session_id+"', '"+token+"','"+employee_id+"')";
        conn.query(sql, function (err, result) {
          if (err) {
              reject(err)
          }else{
              resolve("Added")
          }
        });
    }

);
const updateToken =  (session_id,token)=> new Promise(
    async (resolve,reject)=>{
        let sql = "update employee_token  set token='"+token+"' where session_id ='"+ session_id+"'";
        conn.query(sql, function (err, results) {
          if (err) {
              reject(err)
          }else{
              resolve("updated")
          }
        });
    }

);
const getEmployeeBySession =  (session_id)=> new Promise(
    async (resolve,reject)=>{
                let sql = "select \
        u.employee_id as employee_id, u.email_address as email_address \
        from employee_token et \
        join users_ibex u \
        on et.employee_id=u.employee_id \
        where et.session_id='"+ session_id+"'";
        
        
        conn.query(sql, function (err, results) {
          if (err) {
              reject(err)
          }else{
              resolve(results)
          }
        });
    }

);

module.exports={
        "checkViberUser":checkViberUser,
        "checkUserExists":checkUserExists,
        "insertViberUser":insertViberUser,
        "inserToken":insertToken,
        "getToken":getToken,
        "updateToken":updateToken,
        "getEmployeeBySession":getEmployeeBySession
}