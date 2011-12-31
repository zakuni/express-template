
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { pretty: true});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var mongoModel = require('./models/shelf_models.js');
var db = mongoModel.createConnection('mongodb://localhost:27017/shelf');

var Book = db.model('Book');

// Routes

app.get('/', routes.index);

app.post('/', function(req, res){
  res.send('message: ' + req.body.fomfom);
})

var japanese = encodeURI('/日本語');
app.get(japanese, function(req, res){
  res.render('index', { title: 'Express テンプレート',
  			description: 'Expressのテンプレート'})
});

app.get('/books', function(req, res) {
  Book.find().asc('title').find(function(err, list){
    res.render('books', {
      title: 'books',
      books: list
    })
    console.log(list);
  })
})

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
