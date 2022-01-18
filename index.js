if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

/*
  ---- EXPRESS ----
  We are using Express framework for running our 
  web application and then starting an http server with it
*/
const express = require("express");
const app = express();
const server = require("http").Server(app);
/*
  ---- Misc. dependency imports followed -----
*/
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');

/*
  ---- APP USAGE ----
*/
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json());


// ------- SOURCE -------


app.get('/', (req, res) => {
  res.render('index.ejs')
})


app.get('/employees', async (req, res) => {
  const emp = await FetchEmployeeList();
  res.render('employees.ejs', {e: emp})
})

const FetchEmployeeList = async () => {
  const data = await readFile('./db/employees.json', 'utf-8');
  obj = JSON.parse(data);
  return obj.employees;
}

server.listen(80)
console.log("Server now running on http://localhost")
