module.exports = function(router) {
    'use strict';

    const students = require('../controllers/students');

    router.route('/:studentId')
    .get(students.getOne)
    .put(students.update)
    .delete(students.delete);

    router.route('/')
    .get(students.getAll)
    .post(students.createNew);
};