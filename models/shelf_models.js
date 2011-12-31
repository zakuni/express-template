var mongoose = require('mongoose')

var BookSchema = new mongoose.Schema({
  title: String,
  author: String
})

mongoose.model('Book', BookSchema);

exports.createConnection = function(url) {
  return mongoose.createConnection(url);
}
