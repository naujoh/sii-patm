const studentsModel = require('../models/students');

async function getOne(req, res) {
    studentsModel.getOne(req.app.locals.db, req.params, db_data => res.json(db_data));
} 

async function getAll(req, res) {
    studentsModel.getAll(req.app.locals.db, db_data => res.json(db_data));
}

async function createNew(req, res) {
    studentsModel.create(req.app.locals.db, req.body, db_res => res.json(db_res));
}

async function update(req, res) {
    studentsModel.update(res.app.locals.db, req.params, req.body, db_res => res.json(db_res));
}

async function remove(req, res) {
    studentsModel.remove(res.app.locals.db, req.params, db_res => res.json(db_res));
}

module.exports = {
    getOne : getOne,
    getAll : getAll,
    createNew : createNew,
    update : update,
    delete : remove
};