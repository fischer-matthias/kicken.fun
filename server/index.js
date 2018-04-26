// imports
const express = require('express');
const app = express();
const http = require('http').Server(app);

// register routes
app.use('/players/', require('./api/routes/players')().routes);

var port = 8080;
if(process.argv[2] !== undefined && process.argv[2] !== null) {
    port = process.argv[2];
}

// start webserver
http.listen(port, () => {
    console.log('Started webserver on port ' + port + '.')
});