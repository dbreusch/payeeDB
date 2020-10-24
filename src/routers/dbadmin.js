//jshint esversion:6
require('dotenv').config()

const path = require('path')
const fs = require('fs')

const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const hbs = require('hbs')

const parse = require('csv-parse/lib/sync');

require('../db/mongoose')
const Payee = require('../models/payee')
const Budget = require('../models/budget')

// get Create Database
router.get('/dbcreate', function(req, res) {
  res.render('dbCreate', {
    subTitle: 'Create'
  } );
});

// get Delete Database
router.get('/dbdelete', function(req, res) {
  res.render('dbDelete', {
    subTitle: 'Delete'
  } );
});

// get Export Database
router.get('/dbexport', function(req, res) {
  res.render('dbExport', {
    subTitle: 'Export'
  } );
});

// post Create DB
router.post('/dbcreate', function(req, res) {
  if (req.body.cancel != null) {
    res.redirect('/');
  } else {
    // const ifn = 'test10.csv';
    const ifn = req.body.filename;
    const dbType = req.body.checkbox;

    try {
      const buf = fs.readFileSync(ifn, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Filename not found')
      } else {
        throw err;
      }
    }

    const inputRecords = parse(buf, {
      columns: true,
      skip_empty_lines: true,
      bom: true
    });

    inputRecords.forEach(function(item) {
      console.log(item.Final);
    });

    if (dbType === 'original') {
      console.log('original db');
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

    } else if (dbType === 'final') {
      console.log('final db');
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
      console.log('unknown db');
    }

    res.send(inputRecords);

    // res.redirect('/');
  }
});

// post Delete DB
router.post('/dbDelete', function(req, res) {
  // console.log('dbdelete');
  // console.log(req.body);

  if (req.body.cancel != null) {
    res.redirect('/');
  } else {
    // console.log(confirm);

    const dbname = req.body.dbname;

    console.log('dbname is ' + dbname);
    res.send('Will delete ' + dbname);
  }
});

// post Export DB
router.post('/dbExport', function(req, res) {
  // console.log('dbexport');
  // console.log(req.body);

  if (req.body.cancel != null) {
    res.redirect('/');
  } else {
    // console.log(confirm);

    const dbname = req.body.dbname;

    console.log('dbname is ' + dbname);
    res.send('Will export ' + dbname);
  }
});

module.exports = router
