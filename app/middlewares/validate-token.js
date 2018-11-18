const userModel = require('../models/users');

module.exports = function(req, res, next) {
    'use strict'
    userModel.validateToken(req.app.locals.db, [req.headers['user-token']], res, db_res => {
        db_res.rowCount > 0 ? next() : res.json({info : 'Expired or invalid token'});
    });
} 