/* eslint-disable indent */
'use strict';
const express = require('express');

const app = express();

//sends text to the client
app.get('/', (req,res) => {
    res.send('Hello Express!');
});

//assigns a port for the server to be listening at 
app.listen(8080, () => {
    console.log('Express server is listening on port 8080!');
});

//npm start --> logs Express server is listening on port 8080! to terminal 
//and Hello Express! to browser