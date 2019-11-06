/**
 * Node.JS Web Server for Testing purposes
 */

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {

	servefile(req, res);

}).listen(8080);

console.log("servidor web iniciado");

function servefile(entrada, salida) {
	adr = url.parse(entrada.url, true);
	/* Calling the JS interpreter */

	//Checking if the file exists in the interpreter list
	fexist = false;
	if (adr.pathname.split('.')[1]=='js'){
		var backcode = "interpreter" + adr.pathname;
		console.log("creacion del fichero de prueba:" + backcode);
		
		try {
			fs.accessSync(backcode);
			fexist = true;
		} catch (err) {
			console.log("api file does not exist")
		}
	}
	//if the file exists in the interpreter folder, then we handle it
	if (fexist) {
		var module = "./" + backcode.split(".")[0];
		console.log("crea modulo interpretador")
		var inter = require(module);
		// getting arguments differentiating GET '?' and POST/PUT/DELETE
		if (entrada.method == 'GET') {
			arg = adr.query;
			inter.call(entrada, salida, arg);
			console.log("salida del interpretador");
			return;
			
		} else {
			// in the case of POST it passes the whole body to the function in the "arg"
			let body='';
			entrada.on('data', datachunk=>{
			body+=datachunk;	
			});
			entrada.on('end', ()=>{
				arg = body;
				inter.call(entrada, salida, arg);
				console.log("salida del interpretador");
				return;
				
			})

		}

		// calling the script
		/*inter.call(entrada, salida, arg);
		console.log("salida del interpretador");
		return salida.end();*/

	//if the file does not exist in the interpreter folder then we provision the "regular" file	
	} else {
		/* Executing frontend file calls */
		
		
		var htmlfile = "." + adr.pathname;
		console.log("dentro del frontend render" + htmlfile);
		switch (adr.pathname.split('.')[1]) {
		case "css":
			console.log("dentro montador del css");
			salida.writeHead(200, {
				'Content-Type' : 'text/css'
			});
			break;
		case "js":
			salida.writeHead(200, {
				'Content-Type' : 'text/javascript'
			});
			break;
		case "ico":
		case "gif":
		case "png":
		case "jpg":
			salida.writeHead(200, {
				'Content-Type' : 'image/gif'
			});
			break;
		default:
			salida.writeHead(200, {
				'Content-Type' : 'text/html'
			});
		}
		
		fs.readFile(htmlfile, (err,data) =>{
			if (err) {
				console.log(err);
				salida.writeHead(400, {
					'Content-Type' : 'text/html'
				});
				salida.write("<h1>404 File Not Found</h1>");
				return salida.end();
			}
		
			salida.write(data);
			return salida.end();		
		})
	}

};



