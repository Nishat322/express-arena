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
    res.status(200).send(`The sum of ${a} and ${b} is ${sum}`);
});

app.get('/cipher', (req,res) => {
    const {text,shift} = req.query;
    if(!text) {
        return res.status(400).send('text is required');
    }
    
    if(!shift) {
        return res.status(400).send('shift is required');
    }
    
    const numShift = parseFloat(shift);
    
    if(Number.isNaN(numShift)) {
        return res.status(400).send('shift must be a number');
    }

    const base = 'A'.charCodeAt(0);  // get char code 

    const cipher = text
                    .toUpperCase()
                    .split('') // create an array of characters
                    .map(char => { // map each original char to a converted char
                        const code = char.charCodeAt(0); //get the char code
                    // if it is not one of the 26 letters ignore it
                        if(code < base || code > (base + 26)) {
                        return char;
                    }
    // otherwise convert it
    // get the distance from A
    let diff = code - base;
    diff = diff + numShift; 
      
    // in case shift takes the value past Z, cycle back to the beginning
    diff = diff % 26;

    // convert back to a character
    const shiftedChar = String.fromCharCode(base + diff);
    return shiftedChar;
    })
    .join(''); // construct a String from the array

    // Return the response
    res.status(200).send(cipher);  
});




//assigns a port for the server to be listening at 
app.listen(8080, () => {
    console.log('Express server is listening on port 8080!');
});

//npm start --> logs Express server is listening on port 8080! to terminal 
//and Hello Express! to browser
//npm run dev --> add script dev: nodemon app, automatically updates server while making updates