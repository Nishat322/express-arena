/* eslint-disable indent */
'use strict';
const express = require('express');
//morgan is a loggin tool, installed as  middleware function, in terminal it will give information on the requests sent 
const morgan = require('morgan');

const app = express();
//there are several format strings that can be used with morgan, dev is an example.
app.use(morgan('dev'));
/*Basic GET routes include get(PATH, HANDLER)
    - PATH - path on the server
    - HANDLER - function to be exuted when the route is matched, it takes in two parameters
        - One para is req, the request object
        - Second is res, the rsponse object 
*/ 

//sends text to the client
app.get('/', (req,res) => {
    res.send('Hello Express!');
});

app.get('/burgers',(req,res) => {
    res.send('We have juicy cheese burgers!');
});

app.get('/pizza/peporoni',(req,res) => {
    res.send('Your pizza is on the way');
});

app.get('/pizza/pineapple',(req,res) => {
    res.send('We don\'t serve that here. Never call again!');
});

app.get('/echo',(req,res) => {
    const responseText = `Here are some details of our request:
        Base URL : ${req.baseUrl}
        Host : ${req.hostname}
        Path : ${req.path}`;
    res.send(responseText);
});

//when a query is added to the url objects are added to the query object
//ex: queryViewer?name=Legolas --> on terminal object {name: Legolas is printed}
app.get('/queryViewer',(req,res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client 
});

app.get('/greeting',(req,res) => {
    //values from the request
    const name = req.query.name;
    const race = req.query.race;

    //validate the values (do not trustthe client)
    //send error message if values do not exist
    if(!name){
        return res.status(400).send('Please provide a name');
    }
    //status() => sends a call to the status method of the response object 
    //sets a status of 400 Bad request to the error response 
    if(!race){
        return res.status(400).send('Please provide a race');
    }
    //after validation use the values 
    const greeting = `Greeting ${name} the ${race}, welcome!`;
    //send values to client
    res.send(greeting);
});

/********************************* ASSIGNMENT *************************************/
app.get('/sum', (req,res) => {
    const a = parseInt(req.query.a,10);
    const b = parseInt(req.query.b,10);

    if(!a) {
        res.status(400).send ('Please provide a');
    }

    if(!b){
        res.status(400).send('Please provide b');
    }

    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});





//assigns a port for the server to be listening at 
app.listen(8080, () => {
    console.log('Express server is listening on port 8080!');
});

//npm start --> logs Express server is listening on port 8080! to terminal 
//and Hello Express! to browser
//npm run dev --> add script dev: nodemon app, automatically updates server while making updates