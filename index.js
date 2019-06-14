'use strict';

//==========MODULOS===============
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rest = require('request');
var RedFabric = require('./redFabric.js');

//==========VARIABLES===============
app.set('port', 8081);
app.set('rest',rest);
const redFabric = new RedFabric('admin');

//==========INICIACION=============
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//==========RUTAS================

require("./funciones.js")(app, redFabric);

//===========RUN===============
// Lanza el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo en el puerto: 8081");
});
