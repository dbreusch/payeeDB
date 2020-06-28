//jshint esversion:6
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const tools = require(__dirname + "/tools.js");

// ======================
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;
//
// var $ = jQuery = require('jquery')(window);
// ======================

// set up Express and create app and app options
const localPort = 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// setup Database
const dbName = process.env.DB_NAME;
const url = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to " + dbName);
});

// create Schema and Model for Payee
const payeeSchema = new mongoose.Schema({
  original: String,
  final: String,
  addDate: Date,
  accessDate: Date,
  accessCount: Number
});

const Payee = mongoose.model("Payee", payeeSchema);

// create Schema and Model for Budget
const budgetSchema = new mongoose.Schema({
  payee: String,
  budget: String,
  addDate: Date,
  accessDate: Date,
  accessCount: Number
});

const Budget = mongoose.model("Budget", budgetSchema);

// const day = date.getDate();
// console.log(day);

// get Home
app.get("/", function(req, res) {
  res.render("home");
});

// get Load Database
app.get("/loaddb", function(req, res) {
  res.render("loaddb");
});

app.get("/dbadmin", function(req, res) {
  res.render("dbAdmin", { tools: tools } );
});

// get Load Transactions
app.get("/loadtrans", function(req, res) {
  res.render("loadtrans");
});

// post Load DB
app.post("/dbcreate", function(req, res) {

  if (req.body.cancel != null) {
    res.redirect("/");
  } else {
    // const ifn = "test10.csv";
    const ifn = req.body.filename;
    const dbType = req.body.checkbox;

    const buf = fs.readFileSync(ifn, "utf8");
    const inputRecords = parse(buf, {
      columns: true,
      skip_empty_lines: true,
      bom: true
    });

    inputRecords.forEach(function(item) {
      console.log(item.Final);
    });

    if (dbType === "original") {
      console.log("original db");
      const rec1 = inputRecords[0];
      const now = Date.now();
      const item = new Payee({
        original: rec1.Original,
        final: rec1.Final,
        addDate: now,
        accessDate: now,
        accessCount: 1
      });

      item.save();

    } else if (dbType === "final") {
      console.log("final db");
      const rec1 = inputRecords[0];
      const now = Date.now();
      const item = new Budget({
        payee: rec1.Final,
        budget: rec1.Category,
        addDate: now,
        accessDate: now,
        accessCount: 1
      });

      item.save();

    } else {
      console.log("unknown db");
    }

    res.send(inputRecords);

    // res.redirect("/");

  }
});

// post delete DB
app.post("/dbdelete", function(req, res) {
  console.log("dbdelete");
  console.log(req.body);

  if (req.body.abort != null) {
    res.redirect("/");
  } else {
    // console.log(confirm);

    const dbname = req.body.dbname;

    console.log("dbname is " + dbname);
    res.send("Will delete " + dbname);
  }
});

// post Load Transactions
app.post("/loadtrans", function(req, res) {
  if (req.body.cancel != null) {
    res.redirect("/");
  } else {

    const ifn = req.body.filename;

    const buf = fs.readFileSync(ifn, "utf8");
    const inputTrans = parse(buf, {
      columns: true,
      skip_empty_lines: true,
      bom: true
    });

    res.send(inputTrans);

    inputTrans.forEach(function(item) {
      console.log(item.Final);
    });
  }

  // const rec1 = inputRecords[0];
  // const now = Date.now();
  // const payee = new Payee({
  //   original: rec1.Original,
  //   final: rec1.Final,
  //   addDate: now,
  //   accessDate: now,
  //   accessCount: 1
  // });
  //
  // payee.save();
});

app.listen(localPort, function() {
  console.log("Server started on port " + localPort);
});
