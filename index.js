const express = require('express');
const boxSdk = require('box-node-sdk');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');

var sdk = new boxSdk({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
});
var boxClient = sdk.getBasicClient(process.env.BOX_USER_ACCESS_TOKEN);

// Get the ID of the todo folder
var folderId;
boxClient.folders.get('0', null, function(err, folder) {
  if (err) throw err;
  var found = false;
  for (var item of folder.item_collection.entries) {
    if (item.name === "todos") {
      folderId = item.id;
      found = true;
      break;
    }
  }
  
  // Create a new directory of "todos" if it doesn't exist
  if (!found) {
    boxClient.folders.create('0', 'todos', function(err, folder) {
      if (err) throw err;
      folderId = folder.id;
      
      // Start the application
      app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
    });
  } else {
    // The folder already exists. Start the application
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  }
});

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

app.get('/', function (req, res) {
  // Read the TODO items from Box
  boxClient.folders.getItems(folderId, null, function(err, items) {
    if (err) throw err;
    var todos = [];
    for (var item of items.entries) {
      todos.push(item.name);
    }
    
    res.render('index', {todos: todos});
  });
});

app.post('/add', function (req, res) {
  var newTodo = req.body.todo;
  console.log("new TODO item:", newTodo);
  
  // Create a new file whose name is the new TODO item
  boxClient.files.uploadFile(folderId, newTodo, new Buffer(0), function(err, file) {
    if (err) throw err;
    res.redirect(302, '/');
  });
});