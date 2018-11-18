const usersModule = require('../models/users');

function login(req, res) {
    usersModule.login(req.app.locals.db, req.body, db_res => res.json(db_res));
}

module.exports = { login : login };