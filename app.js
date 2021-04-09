const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const path= require('path');
 


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express body parser
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for using static files
app.use(express.static('public'));

//setting routes
app.use('/', require('./routes/index'));

const server = app.listen(5000);
console.log('server running at port 5000');