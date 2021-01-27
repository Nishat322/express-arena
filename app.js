/* eslint-disable indent */
'use strict';
const express = require('express');

const app = express();

//sends text to the client
app.get('/', (req,res) => {
    res.send('Hello Express!');
});