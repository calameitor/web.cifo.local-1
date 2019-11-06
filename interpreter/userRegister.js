/**
 *  API for the Registration of a new user
 */

exports.call= function (reqint, resint, arg){
	var qs = require('querystring')
	var fs = require('fs');
	var mysql = require('mysql');
	const https = require('https');
	
	console.log('dentro del interpretador userRegister!');
	
	var con = mysql.createConnection({
		host : "localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PWD,
		database : "cifo"
	});
	 
	//secret key for recaptcha validation v3*
	var secretKey = "6LfoRcAUAAAAAF1nkp80uJIRo2bTTlVVboXA3ese";
	var body = qs.parse(arg);
	console.log(body);
	
	
	// Calling google recapthcha server
	var googyPost = `secret=${secretKey}&response=${body.grecaptcha}`;

	var options = {
			  hostname: 'google.com',
			  port: 443,
			  path: '/recaptcha/api/siteverify',
			  method: 'POST',
			  headers: {
			       'Content-Type': 'application/x-www-form-urlencoded',
			       'Content-Length': Buffer.byteLength(googyPost)
			     }
			};

	var req= https.request(options, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
			var googyRe = JSON.parse(data);
			
			// Returning user page with "all OK
			if(googyRe.success){
				fs.readFile("ContactoBack.html", (err,data) =>{
					if (err) {
						console.log(err);
						resint.writeHead(400, {
						'Content-Type' : 'text/html'
						});
						resint.write("<h1>404 File Not Found</h1>");
						return resint.end();
					}
			
					resint.write(data);
					return resint.end();		
				})
			}
			else{
				resint.write("PageNotFound 404");
				return resint.end();
			}
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
	
	req.write(googyPost);
	req.end();	
	
}