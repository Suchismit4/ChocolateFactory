/*
  ---- EXPRESS ----
  We are using Express framework for running our 
  web application and then starting an http server with it
*/
const express = require("express");
const app = express();
const server = require("http").Server(app);
const PORT = 80;
/*
  ---- Misc. dependency imports followed -----
*/
const bodyParser = require("body-parser");
var session = require('express-session');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');

/*
  ---- APP USAGE ----
*/
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret:'tore-maa-gay69.420'
,name:'chocolateID'
,saveUninitialized:false,
 cookie: { maxAge: 600000 }}));
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// ------- SOURCE -------


app.get('/', (req, res) => {
  if(req.session.loggedIn){
  res.redirect('/supply_chain')
  } else {
  res.render('login.ejs');
  }
});

//AUTHENTICATION
app.post('/auth', bodyParser.urlencoded() ,(req,res,next)=> {
if(req.body.CEC=='admin') {
  res.locals.CEC = req.body.CEC;
  next();
} else {res.redirect('/');}
},(req,res)=> {
  req.session.loggedIn = true;
  req.session.CEC = res.locals.CEC;
  res.redirect('/supply_chain');
});

//LOGOUT
app.get('/logout', bodyParser.urlencoded() ,(req,res,next)=> {
if(req.session.loggedIn) {
  req.session.destroy();
  next();
} else {res.redirect('/');}
},(req,res)=> {
  res.redirect('/');
});

app.get('/supply_chain', async (req, res) => {
  if (!req.session.loggedIn){res.redirect('/');return;}
  const data = await readFile('./db/inventory.json', 'utf-8');
  obj = JSON.parse(data);
  res.render('supply_chain.ejs', {e: obj.inventory});
});

app.get('/employees', async (req, res) => {
  if (!req.session.loggedIn){res.redirect('/');return;}
  const data = await readFile('./db/employees.json', 'utf-8');
  obj = JSON.parse(data);
  res.render('employees.ejs', {e: obj.employees});
});

app.get('/inventory', async (req, res) => {
  if (!req.session.loggedIn){res.redirect('/');return;}
  const data = await readFile('./db/inventory.json', 'utf-8');
  obj = JSON.parse(data);
  res.render('inventory.ejs', {e: obj.inventory});
});

app.get('/payments', async (req, res) => {
  if (!req.session.loggedIn){res.redirect('/');return;}
  res.render('payments.ejs');
})

server.listen(PORT);
console.log("Server now running on port "+PORT);
