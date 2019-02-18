let express  = require('express')
let app =  express()
let mysql =  require('mysql')

//This middleware provides a consistent API for MySQL connections during request / response lifecycle
let my_connection = require('express-myconnection')

//loading config detaiils from config/db.js
let config = require('./scripts/config/db.js')
let db_options = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database:config.database.db
}
// 3 connection types can be used: pool (auto released connection), single(connection that is never closed)
// request: new connection per request,
app.use(my_connection(mysql, db_options, 'pool'))


//setting up templating view engine
app.set('view engine', 'ejs')


//import routes
let index =  require('./scripts/routes/index')
let users =  require('./scripts/routes/users')

//express validator middleware for form valaidation
let express_validator = require('express-validator')
app.use(express_validator())

/*
  body-parser module is used to read HTTP POST dat
    it is an express middleware that reads form's input  and stores it as a javascript object
 */

 let body_parser =  require('body-parser')

 /*
    body_parser.urlencoded() parses the text as URL encoded data
    - which is how browsers tend to send form data from regular form set to POST
    and exposes the resulting object (containing the keys and values ) on req.body
  */

  app.use(body_parser.urlencoded({extended: true}))
  app.use(body_parser.json())


  //this module let us use HTTP verbs such as PUT or DELETE in places where they are not supported
  let method_override = require('method-override')

  //use custom logic to override methods

  app.use(method_override(function(req, res){
    if(req.body && typeof req.body === 'object' && ' _method'in req.body){
      //look in urlencoded POST bodi
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

//flash messages
let flash = require('express-flash')
let cookie_parser =  require('cookie-parser')
let session =  require('express-session')

app.use(cookie_parser('keyboard cat'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))


app.use(flash())
app.use('/', index)
// app.use('/users', users)

app.listen(3000, function(){
  console.log('server is running at port 3000: http://127.0.0.1:3000')
})
