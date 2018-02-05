var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbURL = 'postgres://gligyezh:YbWG5l2txol8fe6e3EUnrjw7sJ8N5TP2@baasu.db.elephantsql.com:5432/gligyezh'
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {

  	var username = req.body.username
  	var password = req.body.password;

  	client.query(
  	"SELECT * FROM users WHERE username = $1 AND password = $2",
  	[username, password], function (err, result){

  		if (err) {
  			console.log(err);
  			res.send({ 'success': false, 'message': 'Could not connect to db'})
  		}

  		if (result.rows.length > 0) {
  			console.log(result.rows[0]);
  			res.send({ 'success': true, 'user': result.rows[0].username });
  		} else {
  			res.send({ 'success': false, 'message': 'User not found' });
  		}
  	}
  );
  //})

});

module.exports = router;