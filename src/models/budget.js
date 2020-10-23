const mongoose = require('mongoose')
const validator = require('validator')

// create Schema and Model for Budget
const Budget = new mongoose.model( 'Budget', {
  payee: {
    type: String
  },
  budget: {
    type: String
  },
  addDate: {
    type: Date
  },
  accessDate: {
    type: Date
  },
  accessCount: {
    type: Number
  }
})
