var xhr,elem;


	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status ==200 ) {
            objLang=JSON.parse(xhr.responseText);
            for(var i=0 ; i< objLang.length; i++){
            	cadena += '<a class="dropdown-item" href="#">'+ objLang[i].name+ '</a>'; 
            }            
            document.getElementById("langBtn").innerHTML = cadena;
          } else if (xhr.readyState ==4 && xhr.status !=200)
        	  {
        	  alert('request error');
        	  }
	}
	xhr.open('GET', 'https://cifo.azurewebsites.net/js/languages.json', true);
	xhr.send();


// EXAMPLE FOR AJAX CONTROLLER
/*document.getElementById("btnBook").onclick=function(){
		// Crear instancia de l'objecte XMLHttpRequest sobre la variable xhr
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		// Definir la funció de callBack()
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 &&  xhr.status == 200 ) {
			    // tot va bé, s'ha rebut la resposta
				var objBook=JSON.parse(xhr.responseText);
				
				//SUSTITUCIONES DE LA VISTA CUANDO JSON TIENE UNA VARIABLE 
				bookTmpl=bookTmpl.replace(/objBook\.Title/g,objBook.Title);
				bookTmpl=bookTmpl.replace(/objBook\.Author/g,objBook.Author);
				bookTmpl=bookTmpl.replace(/objBook\.Genre/g,objBook.Genre);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Language/g,objBook.Detail.Language);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Pages/g,objBook.Detail.Pages);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.Publication_Year/g,objBook.Detail.Publication_Year);
				bookTmpl=bookTmpl.replace(/objBook\.Detail\.ISBN-13/g,objBook.Detail["ISBN-13"]);
				document.getElementById('boxBook').innerHTML=bookTmpl;
				
				// SUSTITUCIONES DE LA VISTA CUANDO JSON ES UN ARRAY
				var cadena="<table class=\"table \">";
				for(var i=0 ; i< objBook.Price.length; i++){
					cadena+="<tr>";
					cadena+="<td>"+objBook.Price[i].type+"</td>";
					cadena+="<td>"+objBook.Price[i].price+"</td>";
					cadena+="</tr>";
				}
				cadena+="</table>";
				document.querySelector("#boxBook .card-footer").innerHTML = cadena;
				
			}else if(xhr.readyState == 4 &&  xhr.status == 404){
				alert('Ho sentim el servidor sembla que no es troba disponible');
			}
			
		};
		
		
		// Definim els parametres de sol·licitus HTTP
		xhr.open('GET','http://pla3.pqtm19.local/JSON/book.php',true);
		xhr.setRequestHeader("Authorization", "Basic "+ btoa("pepe:12345"));
		// Iniciem la sol·licitud
		xhr.send(null);
	}*/