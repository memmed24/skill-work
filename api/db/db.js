const mongoose = require('mongoose');
const config = require('../config/config');


mongoose.connect(`${config.getDbUrl()}`, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.then((db) => {
  console.log("Connection has made");
}).catch(error => {
  console.log(config.getDbUrl())
});

module.exports = connection;