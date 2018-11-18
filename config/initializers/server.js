var express  = require('express');
var path     = require('path');
var nconf    = require('nconf');
var bParser  = require('body-parser');
var morgan   = require('morgan');
var logger   = require('winston');
var http     = require('http');
var https    = require('https');
var app;

module.exports = function (db, cb) {
    'use strict';

    app = express();
    app.locals.db = db;
    app.use(morgan('common'));
    app.use(bParser.urlencoded({extended: true}));
    app.use(bParser.json({type: '*/*'}));

    logger.info('[SERVER] Initializing routes');
    require('../../app/routes/index')(app);

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: (app.get('env') === 'development' ? err : {})
        });
        next(err);
    });
    http.createServer(app).listen(nconf.get('NODE_PORT'));
    https.createServer(nconf.get('ssl-files'), app).listen(nconf.get('NODE_PORT_HTTPS'));
    logger.info('[SERVER] Listening http connections on port ' + nconf.get('NODE_PORT'));
    logger.info('[SERVER] Listening https connections on port ' + nconf.get('NODE_PORT_HTTPS'));

    if(cb) { return cb(); }
}