'use strict';

var nconf  = require('nconf');   //Configuration manager
var async  = require('async');   //Perform async operations
var logger = require('winston'); //Module to make logs

//Load enviroment variables from .env file
require('dotenv').load(); 

//Set up configs using nconf module
nconf.use('memory');
nconf.argv();
nconf.env(); //Set env variables

//Load configuration file for the enviroment (i.e development, production, ...)
require('./config/enviroments/' + nconf.get('NODE_ENV'));

logger.info('[APP] Starting server initialization');

//Initialize app modules
async.waterfall([
    function initDBConnection(callback) {
        require('./config/initializers/database')(callback);
    },
    function initServer(db, callback) {
        require('./config/initializers/server')(db, callback);
    }],
    function (err) {
        if (err) { logger.error('[APP] initialization modules failed', err); }
        else { logger.info('[APP] initialized successfully'); }
    });