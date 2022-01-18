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
const fileUpload = require('express-fileupload');
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
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./convertor/videos/"
}))

/**
 * <<------- SOURCE ------->> 
 * 
 */

app.get('/', (req, res) => {
    res.render('index.ejs')
})


server.listen(80)
console.log("Server now running on http://localhost")
