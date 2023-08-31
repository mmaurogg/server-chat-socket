const { log } = require('console');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

//lectura y parseo de body enhttp
app.use( express.json() );  // el app es un midleware



// Servidores para sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//DB config
const { dbConnection } = require('./database/config');
dbConnection()



//Path publica
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/message', require('./routes/message'));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});