const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const app = express();
const router = require('./routes/router');

// use cors
app.use(cors('http://localhost:5173/'));

// define port
const port = 3000;

// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//define routes
app.use('/api', router);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});