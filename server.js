var express = require('express');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('rcb_authentication_db', 'root');

var User = sequelize.define('user', {
      email: {
             type: Sequelize.STRING,
             unique: true
      },
    password: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,  
});

var PORT = process.env.NODE_ENV || 3000;

var app = express();

var connection = mysql.createConnection({
   port: 3306,
   host: 'localhost',
   user: 'root',
  database: 'rcb_authentication_db'
});

app.use(session({
        secret: "this is a secret",
        cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 14
        },
        saveUninitialized: true,
        resave: false
}));        

app.engine('handlebars', expressHandlebars({
   defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
   extended: false
}));


app.get('/', function(req, res) {
        res.render('index', {
          msg: req.query.msg
        });
});



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

app.post('/register', function(req, res) {
  User.create(req.body).then(function(user) {
        req.session.authenticated = user;
        res.redirect('/secret');
  }).catch(function(err) {
                    res.redirect("/?msg=" + err.message);
  });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
          where: {
                   email: email,
                   password: password
          }
  }).then(function(user) {
          if(user) {
                   req.session.authenticated = user;
                   res.redirect('/secret');
          } else {
                   res.redirect('/?msg=Invalid login');
          }
  }).catch(function(err) {
          throw err;
  });
});

app.get('/secret', funtion(req,res) {

      //if user is authenticated
      if(req.session.authenticated) {
             res.render("secret");
      } else {
             res.redirect("/msg=you are not logged in");
      }
});

sequelize.sync().then(function() {
        app.listen(PORT, function() {
                console.log("Listening on port %s", PORT);
        })
});