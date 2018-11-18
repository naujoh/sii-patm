const crypto = require('crypto');

async function validateToken(db, param, res, callback) {
    db.query(
        "SELECT * FROM accesos WHERE token = $1 and fecha_fin > now()",
        param
    )
    .then(db_res => callback(db_res))
    .catch(e => res.json({error : 'Something went wrong ' + e.stack}));
}

async function login(db, data, callback) {
    const {user, pass} = data;
    db.query(
        "SELECT * FROM usuario WHERE usuario = $1 and contrasena = $2",
        [user, pass]
    )
    .then(db_res => {
        if(db_res.rowCount > 0) {
            const token = crypto.createHash('md5').update(user + Date.now()).digest('hex'); //Generate token  
            db.query("INSERT INTO accesos " +
                     "(token, fecha_inicio, fecha_fin)" + 
                     "values ($1, now(), now() + interval '30 minutes')",
                     [token]
                    )
                    .then(db_res => (db_res.rowCount > 0) 
                                    ? callback({user : user, token : token}) 
                                    : callback({info : 'Error during login, check user and password'}))
                    .catch(e => callback({error : '[DATABASE] Something went wrong ' + e.stack}))
        } else { callback({info : 'User not found'}); }
    })
    .catch(e => callback({error : '[DATABASE] Something went wrong ' + e.stack}));
}

module.exports = {
    validateToken : validateToken,
    login : login
}