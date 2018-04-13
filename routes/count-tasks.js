var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbURL = 'postgres://followthru:cascadeapp@follow-thru-db.czto5vbsmdqt.us-west-2.rds.amazonaws.com:5432/followthru';
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {

	if(req.body.user_id != null){
		var user_id = parseInt(req.body.user_id);
		console.log(typeof user_id);
		client.query(
		"SELECT * FROM goals WHERE assigned_to = $1 and finished_date is null and missed = false",
		[user_id], function (err, result){

			if (err) {
				console.log(err);
				res.send({ 'success': false, 'message': 'Could not connect to db'})
			}

			if (result.rows.length > 0) {
				console.log(result.rows);
				console.log('SUCCESS');
				
				res.send({ 'success': true, 'tasks': result.rows });
			} else {
				res.send({ 'success': false, 'message': 'No tasks found.' });
					}
				}
			);
	} else {
		res.send({ 'success': false, 'message': 'Error!' })
	}

});

module.exports = router;