/**
 * Controller functions
 */







// EXAMPLE FOR AJAX CONTROLLER
/*document.getElementById("btnBook").onclick=function(){
		// Instance creation for XMLHttpRequest class on object xhr
			xhr = new XMLHttpRequest();
				
		// Define callBack() function
			xhr.addEventListener ("load", successAJAX);
			xhr.addEventListener ("error", errorAJAX);
		
		function successAJAX (){
			
				var objBook=JSON.parse(xhr.responseText);
				
				// View sustitution when AJAX retorns ONLY one variable 
				bookTmpl=bookTmpl.replace(/objBook\.Title/g,objBook.Title);
				bookTmpl=bookTmpl.replace(/objBook\.Author/g,objBook.Author);
				bookTmpl=bookTmpl.replace(/objBook\.Genre/g,objBook.Genre);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Language/g,objBook.Detail.Language);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Pages/g,objBook.Detail.Pages);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Publication_Year/g,objBook.Detail.Publication_Year);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.ISBN-13/g,objBook.Detail["ISBN-13"]);
				document.getElementById('boxBook').innerHTML=bookTmpl;
				
				// View sustitution when AJAX is an array
				var cadena="<table class=\"table \">";
				for(var i=0 ; i< objBook.Price.length; i++){
					cadena+="<tr>";
					cadena+="<td>"+objBook.Price[i].type+"</td>";
					cadena+="<td>"+objBook.Price[i].price+"</td>";
					cadena+="</tr>";
				}
				cadena+="</table>";
				document.querySelector("#boxBook .card-footer").innerHTML = cadena;
		};
		
		function errorAJAX(){
			console.log("Sorry, server is not available")
		};
		
		
		// HTTP parameter definition 
		xhr.open('GET','http://pla3.pqtm19.local/JSON/book.php',true);
		(NO --> not to send open pswd on JS)
		xhr.setRequestHeader("Authorization", "Basic "+ btoa("pepe:12345"));
		xhr.setRequestHeader("Cache-Control","private, no-cache, no-store, must-revalidate");
		// Send the server request
		xhr.send(null);
	}*/