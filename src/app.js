//jshint esversion:6
require('dotenv').config()

// standard modules
const path = require('path')
const fs = require('fs')

// Express
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs')

// routes for db administration
const adminRouter = require('./routers/dbadmin')
// routes for transaction processing
const transactionRouter = require('./routers/transactions')

// CSV parse
const parse = require('csv-parse/lib/sync');

// MongoDB and mongoose
require('./db/mongoose')

const Payee = require('./models/payee')
const Budget = require('./models/budget')

// set up Express and create app and app options
const port = process.env.PORT || 3001
const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(adminRouter)          // routes for db administration
app.use(transactionRouter)    // routes for transaction processing

// const day = date.getDate();
// console.log(day);

// route for Home page
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
