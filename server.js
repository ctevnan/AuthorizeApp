var express = require('express');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
   port: 3000,
   host: 'localhost',
   user: 'root',
  database: 'rcb_authentication_db'
});

var PORT = process.env.NODE_ENV || 3000;

var app = express();

app.engine('handlebars', expressHandlebars({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
   extended: false
})))

connection.connect(function(err) {
if (err) {
    console.error('error connecting:' + err.stack);
    return;
  },  

  console.log('connected as id' + connection.threadId);
});

app.get ('/', function(req,res) {
var email + req.body.email;
var password + req.body.password;

connection.query("SELECT * FROM users WHERE email=?", [email], function(err,results) {
  if (err) {
    throw err;
  }

  if (results.length === 0) {
    //create an account
    connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function(err) {
     if (err) {
      throw err;
      }
    
    res.redirect('/success');
    });
  } else {
    res.redirect('/?msg=Email');
  } 
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.passsword;

 connection.query
}   
  