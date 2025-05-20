const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')


const app = express();
const router = require('./routes/router');

// use cors
app.use(cors('https://fullstack-vue-express-frontend.vercel.app/'));

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
  console.log(`Server is running on http://localhost:${port}`);
});