var nconf = require('nconf');
var basicAuthentication = require('basic-auth');

module.exports = function(req, res, next) {
    'use strict'

    const user = basicAuthentication(req);
    const basicAuth = nconf.get('basic-auth');
    if(basicAuth['enable']) {
        if(user != undefined) {
            if(user.name === basicAuth['user'] && user.pass === basicAuth['password']) next();
            else { 
                res.status(401);
                res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.json({error : 'Basic authenticacion failed, check your credentials'});
            }   
        } else { 
            res.status(401);
            res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.json({error : 'Basic authenticacion required'});
        }
    } else next(); 
}