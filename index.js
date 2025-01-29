
// import express
const express = require('express');
// import cors
const cors = require('cors');
//import bodyParser
const bodyParser = require('body-parser')


// create express app
const app = express();

// use cors
app.use(cors());

// define port
const port = 3000;

// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});