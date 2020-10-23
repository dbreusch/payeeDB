require('dotenv').config()
const mongoose = require('mongoose');

// setup Database
const connectionURL = 'mongodb://localhost:27017/'
const collectionName = process.env.DB_NAME;
const collectionURL = connectionURL + '/' + collectionName;
const  mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(connectionURL, mongoOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to " + collectionName);
});
