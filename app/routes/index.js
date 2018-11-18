var changeCase = require('change-case');
var express    = require('express');
var routes     = require('require-dir')();
var basicAuth  = require('../middlewares/basic-authenticaction');
var validateToken  = require('../middlewares/validate-token');

module.exports = function(app) {
    'use strict';
    Object.keys(routes).forEach(function(routeName) {
        var router = express.Router();
        router.use(basicAuth); 
        if(changeCase.paramCase(routeName) != 'users') router.use(validateToken);  
        require('./' + routeName)(router);
        app.use('/' + changeCase.paramCase(routeName), router);
    });
};