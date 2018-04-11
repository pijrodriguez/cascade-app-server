var express = require('express');
var router = express.Router();
var pg = require('pg');

/** BCRYPT **/
const bcrypt = require("bcrypt");
/** BCRYPT **/

var dbURL = 'postgres://cascadeapp:teamcascade@cascade-db.cxnma2xuxlgy.us-west-2.rds.amazonaws.com:5432/cascadeapp'
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {
  	var email = req.body.email
  	var password = req.body.password;

  	client.query(
  	"SELECT * FROM users WHERE email = $1 AND is_admin = false",
  	[email], function (err, result){

  		if (err) {
  			console.log(err);
  			res.send({ 'success': false, 'message': 'Could not connect to db'})
  		}

  		if (result.rows.length > 0) {
			console.log(result.rows[0]);
			var isMatch = bcrypt.compareSync(password, result.rows[0].password)
				if(isMatch){
					res.send({ 
						'success': true, 
						'user': result.rows[0].email,
						'first_name':result.rows[0].fname,
						'last_name':result.rows[0].lname,  
						'user_id': result.rows[0].user_id,
						'password': password 
					});
				} else {
					console.log('Passwords doesn\'t match');
					res.send({ 'success': false, 'message': 'Incorrect password' })
				}
  		} else {
  			res.send({ 'success': false, 'message': 'Incorrect e-mail/password' });
  		}
  	}
  );

});

module.exports = router;