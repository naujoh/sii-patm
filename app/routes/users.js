module.exports = function(router) {
    'use strict';

    const users = require('../controllers/users');
  
    router.post('/login', users.login)
};