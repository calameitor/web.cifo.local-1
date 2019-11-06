/**
 * API to get the courses within the CIFO network by course number (parameter)
 */

exports.call = function(reqint, resint, arg) {

	console.log('dentro API cifoCursos!');

	var mysql = require('mysql');
	var con = mysql.createConnection({
		host : "localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
		database : "cifo"
	})

	con.connect(function(err) {
				if (err)
					throw err;
				console.log("Connected to MySQL cifoCursos!");
				console.log(arg);
				var id_curso;
				//var id_areas;
				arg.curso ? id_curso = `${arg.curso}` : id_curso = '%';
				//arg.area ? id_areas = `${arg.area}` : id_areas = '%';
				console.log(id_curso);
				var sql = 'SELECT * FROM tbl_cursos WHERE id LIKE ?';
				con.query(sql, [ id_curso], function(err, result,
						fields) {
					if (err)
						throw err;

					apiResult = JSON.stringify(result);
					resint.write(apiResult);
					resint.end();
					con.end(function(err) {
						  if (err) {
							    return console.log('error:' + err.message);
							  }
							  console.log('Close the database connection cifoCurso');
							});
				});
			});
	
}
