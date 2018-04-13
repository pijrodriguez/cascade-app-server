require('dotenv').config();
var express = require('express');
var router = express.Router();
var pg = require('pg');

const dbURL = process.env.DATABASE_URL;
/** BCRYPT **/
const bcrypt = require("bcrypt");

//connect to the database
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