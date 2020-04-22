// CREATE DATABASE test; 创建表
var mysql = require('mysql');
let config = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'adsladsl',
    database : 'blog',
    port     :  3306,
    // multipleStatements: true//允许多条sql同时执行
};

let query = (sql, val) => {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection(config); 
    connection.connect();
    connection.query(sql, val, function (err, result) {
            if(err){
              reject(err)
              return;
            }     
            resolve(result)
    });
    connection.end();
  })
}

module.exports = {
    query
}
