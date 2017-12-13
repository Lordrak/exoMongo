//var fs = require('fs');
//var bodyParser = require('body-parser');
var express = require('express');
//var _users = require('./users.json');
var _tokens = [];
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var _client = "";

var app = express();

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});



MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  _client = client;
});


app.get('/users', function(req, res){
  var db = _client.db('simplon');

  db.collection('users').find({}).toArray(function(err, docs) {
    res.status(200).send(docs);
  });
});





// function _findUser(username) {
//   var user = _users.find(function(element) {
//     return element.username == username;
//   });

//   return user;
// }

// app.get('/users', function(req, res) {
//   var token = '';

//   if (req.query.accesstoken) token = req.query.accesstoken;
//   if (req.headers.accesstoken) token = req.headers.accesstoken;

//   var index = _tokens.indexOf(token);

//   if (index != -1) {
//     res.status(200).send({message: 'Toi tu as le droit', data: _users});
//   } else {
//     res.status(401).send('There is no token: DANS TA TRONCHE');
//   }
// });

// app.post('/login', function(req, res) {
//   var body = req.body;

//   if (body.username && body.password) {
//     var user = _findUser(body.username);

//     if (user) {
//       if (user.password == body.password) {
//         var token = user.username + Math.floor(Math.random() * 100000) + 1;

//         _tokens.push(token);

//         res.status(200).send({message: 'Login correct', token: token});
//       } else {
//         res.status(412).send('Password does not match');
//       }
//     } else {
//       res.status(404).send('No account found with username: ' + body.username);
//     }
//   } else {
//     res.status(412).send('You should provide a correct username and a password!');
//   }
// });

// app.post('/create-account', function(req, res) {
//   var body = req.body;

//   if (body.username && body.password) {
//     if (_findUser(body.username)) {
//       res.status(409).send('User already exists with username: ' + body.username);
//     } else {
//       var newProfile = {
//         username: body.username,
//         password: body.password,
//         firstName: body.firstName,
//         lastName: body.lastName,
//         age: body.age,
//       };

//       _users.push(newProfile);

//       // fs.writeFile('users.json', JSON.stringify(_users), function(error) {
//       //   if (error) {
//       //     console.log('There is an error on writing users');
//       //     res.status(500).send('There is an error on writing users');
//       //   } else {
//       //     res.status(200).send({message: 'User created', data: newProfile});
//       //   }
//       // });
//     }
//   } else {
//     res.status(412).send('You should provide all the required fields: username, password');
//   }
// });

app.listen(3000, function() {
  console.log('BACKEND LISTENING ON PORT 3000');
});