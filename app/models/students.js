function getAll(db, callback) {
    db.query(
        "SELECT json_build_object("     +
        "'studentId', a.idalumno,"      + 
        "'controlNumber', a.nocontrol," +
        "'name', a.nombre,"             + 
        "'lastName', a.apepaterno,"     + 
        "'mLastName', a.apematerno,"    + 
        "'email', a.email,"             + 
        "'career', (SELECT json_build_object('careerId', c.idcarrera," +
                                             "'name', c.nombre)"       + 
                   "FROM carrera c WHERE c.idcarrera = a.idcarrera))"  + 
        "FROM alumno a")
        .then(res => { 
            json_res = [];
            (res.rows).forEach(element => { json_res.push(element.json_build_object) });
            callback(json_res);
         })
        .catch(e  => callback({error : 'Database error ' + e.stack}))
}

function getOne(db, params, callback) {
    const { studentId } = params;
    db.query(
        "SELECT json_build_object("     +
        "'studentId', a.idalumno,"      + 
        "'controlNumber', a.nocontrol," +
        "'name', a.nombre,"             + 
        "'lastName', a.apepaterno,"     + 
        "'mLastName', a.apematerno,"    + 
        "'email', a.email,"             + 
        "'career', (SELECT json_build_object('careerId', c.idcarrera," +
                                             "'name', c.nombre)"       + 
                   "FROM carrera c WHERE c.idcarrera = a.idcarrera))"  + 
        "FROM alumno a WHERE a.idalumno = $1", [studentId])
        .then(res => { 
            (res.rows.length > 0) 
            ? callback(res.rows[0].json_build_object)
            : callback({ info: 'No data found' }) 
         })
        .catch(e  => callback({error : 'Database error ' + e.stack}))
}

function create(db, data, callback) {
    const {
        controlNumber, name, lastName,
        mLastName, email, careerId
    } = data;
    db.query(
        "INSERT INTO alumno "               + 
        "(nocontrol, nombre, apepaterno, "  + 
        " apematerno, email, idcarrera) "   +
        " values ($1, $2, $3, $4, $5, $6)",
        [controlNumber, name, lastName, mLastName, email, careerId])
        .then(res => {
            (res.rowCount > 0) 
            ? callback({info : 'Inserted record'})
            : callback({info : 'Something went wrong, record was not inserted'})
        }) 
        .catch(e => { callback({error : 'Database error ' + e.stack}) })
}

function update(db, params, data, callback) {
    const { studentId } = params;
    const {
        controlNumber, name, lastName,
        mLastName, email, careerId
    } = data;
    db.query(
        "UPDATE alumno SET "                 + 
        "nocontrol = $2, nombre = $3, "      + 
        "apepaterno = $4, apematerno = $5, " + 
        "email = $6, idcarrera = $7 "        + 
        "WHERE idalumno = $1", 
        [studentId, controlNumber, name, lastName, mLastName, email, careerId])
        .then(res => { 
            (res.rowCount > 0) 
            ? callback({info : 'Updated record'})
            : callback({info : 'Not updated record, maybe record with that id does not exist'}) 
        })
        .catch(e => callback({error : 'Database error ' + e.stack}))
}

function remove(db, params, callback) {
    const { studentId } = params;
    db.query("DELETE FROM alumno WHERE idalumno = $1", [studentId])
    .then(res => 
        (res.rowCount > 0) 
        ? callback({info : 'Record with id ' + studentId + ' was deleted'})
        : callback({info : 'Record could not been deleted'})
    )
    .catch(e => callback({error : 'Database error ' + e.stack}))
}

module.exports = {
    getAll : getAll,
    getOne : getOne,
    create : create,
    update : update,
    remove : remove
};