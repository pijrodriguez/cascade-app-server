var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbURL = 'postgres://cascadeapp:teamcascade@cascade-db.cxnma2xuxlgy.us-west-2.rds.amazonaws.com:5432/cascadeapp'
const client = new pg.Client(dbURL);
client.connect();

router.post('/', function(req, res, next) {
    var goalID = req.body.goal_id;
  	var assignedTo = req.body.assigned_to;
	
  	client.query(
      "UPDATE goals SET finished_date = current_timestamp - interval '7 hours' WHERE goal_id = $1 AND assigned_to = $2;",
  	[goalID, assignedTo], function (err, result){

  		if (err) {
  			console.log(err);
  			res.send({ 'success': false, 'message': err})
  		} else {
			res.send({ 'success': true, 'message': err})
  		}
  	}
  );
  //})

});

module.exports = router;