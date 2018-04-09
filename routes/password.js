var express = require('express');
var router = express.Router();
var pg = require('pg');

/** BCRYPT **/
const bcrypt = require("bcrypt");
/** BCRYPT **/

//connect to the database
var dbURL = 'postgres://cascadeapp:teamcascade@cascade-db.cxnma2xuxlgy.us-west-2.rds.amazonaws.com:5432/cascadeapp'
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {
    var new_password = req.body.password;
    var userID = req.body.user_id;
    
	//querry the database
	//#####DEVELOPERS NOTE###### added bcrypt function based on Amrit's index.js, but unsure of dependencies for regNewPassword and bpass
	bcrypt.hash(req.body.regNewPassword, 5, function(err, bpass) {
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