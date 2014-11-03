'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    io = require('socket.io'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV ='development';

// Initializing system variables 
var config = require('./config/config'),
    mongoose = require('mongoose');

// Bootstrap db connection
//console.log(config.db);
var db = mongoose.connect("mongodb://zee:my2014pw@ds063307.mongolab.com:63307/meanzee");
//var testdb = mongoose.connect("mongodb://localhost/test");
//testdb.once('open',function(){
  //  console.log("test db connected successfully...");
//});

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);


var app = express();
// Express settings
require('./config/express')(app,db);


// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a 
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);


// Start the app by listening on <port>
var port = process.env.PORT || config.port || 3000;
var server=app.listen(port);

console.log('MEAN Server started on port '+port);
//var reporter = require('nodeunit').reporters.default;
//reporter.run(['tests/First']);
// Initializing logger
//logger.init(app, mongoose);
//console.log('Express  app started on port ' + port);
// Expose app
module.exports = app;
