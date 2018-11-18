var nconf  = require('nconf');
var logger = require('winston');

module.exports = function(cb) {
    'use strict';
    const { Client } = require('pg');
    const client = new Client(nconf.get('database'));
    client.connect((err) => {
        if(err) {
            logger.error('[DB] Database connection failed ', err.stack);
            return;
        } else {
            cb(null, client);
            logger.info('[DB] Database connected');
        }
    });
};