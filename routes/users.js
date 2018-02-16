var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbURL = 'postgres://cascadeapp:teamcascade@cascade-db.cxnma2xuxlgy.us-west-2.rds.amazonaws.com:5432/cascadeapp'
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {

  	var email = req.body.email
  	var password = req.body.password;

  	client.query(
  	"SELECT * FROM users WHERE email = $1 AND password = $2",
  	[email, password], function (err, result){

  		if (err) {
  			console.log(err);
  			res.send({ 'success': false, 'message': 'Could not connect to db'})
  		}

  		if (result.rows.length > 0) {
  			console.log(result.rows[0]);
  			res.send({ 'success': true, 'user': result.rows[0].email });
  		} else {
  			res.send({ 'success': false, 'message': 'User not found' });
  		}
  	}
  );
  //})

});

module.exports = router;