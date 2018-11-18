var nconf = require('nconf');
var fs    = require('fs');

nconf.set('database', {
    host:     nconf.get('DB_HOST'),
    database: nconf.get('DB_NAME'),
    user:     nconf.get('DB_USER'),
    password: nconf.get('DB_PASSWORD'),
    port:     nconf.get('DB_PORT') 
});

nconf.set('basic-auth', {
    enable: true,
    user:     nconf.get('BA_USER'),
    password: nconf.get('BA_PASSWORD')
});

nconf.set('ssl-files', {
    key :  fs.readFileSync(nconf.get('SSL_KEY_PATH')),
    cert : fs.readFileSync(nconf.get('SSL_CERT_PATH'))
});