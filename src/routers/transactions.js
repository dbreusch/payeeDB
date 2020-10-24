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

// get Load Transactions
router.get('/loadtrans', function(req, res) {
  res.render('loadtrans');
});

// post Load Transactions
router.post('/loadtrans', function(req, res) {
  if (req.body.cancel != null) {
    res.redirect('/');
  } else {
    const ifn = req.body.filename;

    try {
      const buf = fs.readFileSync(ifn, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('Filename not found')
      } else {
        throw err;
      }
    }

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

module.exports = router
