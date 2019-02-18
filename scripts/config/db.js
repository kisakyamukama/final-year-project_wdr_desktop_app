// let mysql = require('mysql')
// let $ = require('jquery')
// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'michael',
//   password: 'michael',
//   database: 'electron'
// })
//
// connection.connect(function(err){
//   if(err){
//     console.log(err.code)
//     console.log(err.fatal)
//
//   }else{
//     console.log("Connected to database")
//   }
// })

var config = {
  database: {
    host: 'localhost',
    user: 'michael',
    password: 'michael',
    port: 3306,
    db: 'electron'
  },
  server:{
    host:'127.0.0.1',
    port: '1000'
  }
}
module.exports =  config
