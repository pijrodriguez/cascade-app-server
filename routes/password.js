var express = require('express');
var router = express.Router();
var pg = require('pg');

/** BCRYPT **/
const bcrypt = require("bcrypt");
/** BCRYPT **/

//connect to the database
var dbURL = 'postgres://followthru:cascadeapp@follow-thru-db.czto5vbsmdqt.us-west-2.rds.amazonaws.com:5432/followthru';
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {
    var new_password = req.body.password;
    var userID = req.body.user_id;
    
	bcrypt.hash(new_password, 5, function(err, bpass) {
		client.query(
			"UPDATE users SET password = $1 WHERE user_id = $2;",
			[bpass, userID], function (err, result){
	  
				if (err) {
					console.log(err);
					res.send({ 'success': false, 'message': err})
				} else {
					res.send({ 'success': true });
				}
			}
		);
		
	})
});

module.exports = router;