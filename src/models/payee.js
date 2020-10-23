const mongoose = require('mongoose')
const validator = require('validator')

// Model for Payee
const Payee = payeeSchema = new mongoose.model('Payee', {
  original: {
    type: String
  },
  final: {
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
