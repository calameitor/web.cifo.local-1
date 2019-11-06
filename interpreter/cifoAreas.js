/**
 * API to get the areas in the different CIFO centres.
 */

exports.call = function(reqint, resint, arg){
	
	console.log('dentro API cifoAreas!');

	var mysql = require('mysql');
	var con = mysql.createConnection({
		host:"localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
		database: "cifo"
	})
	
	con.connect(function(err) {
		  if (err) throw err;
		  console.log("Connected to MySQL cifoAreas!");
		  con.query("SELECT * FROM tbl_areas", function (err, result, fields) {
			    if (err) throw err;
			    apiResult = JSON.stringify(result);
			    resint.write(apiResult);
			    resint.end();
				con.end(function(err) {
					  if (err) {
						    return console.log('error:' + err.message);
						  }
						  console.log('Close the database connection cifoAreas');
						});
			  });
			});

		
	
}