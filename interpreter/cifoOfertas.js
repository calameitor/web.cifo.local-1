/**
 * API to get the centers within the CIFO network.
 */

exports.call = function(reqint, resint, arg) {

	console.log('dentro API cifoAreas!');

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
				console.log("Connected to MySQL cifoOfertas!");
				console.log(arg);
				var id_centros;
				var id_areas;
				arg.centro ? id_centros = `${arg.centro}` : id_centros = '%';
				arg.area ? id_areas = `${arg.area}` : id_areas = '%';
				console.log(id_centros, id_areas);
				var sql = 'SELECT * FROM tbl_ofertas JOIN tbl_cursos ON tbl_ofertas.id_cursos = tbl_cursos.id WHERE id_centros LIKE ? AND id_areas LIKE ?';
				con.query(sql, [ id_centros, id_areas ], function(err, result,
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
							  console.log('Close the database connection cifoOfertas');
							});
				});
			});
	
}
