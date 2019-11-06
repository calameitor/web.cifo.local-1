// Checking if cookie consent exists. If not, handle pop-up
if (!detectCookie('rgpda')){
	var cRG=document.getElementById("boxRGPD");
	cRG.classList.remove("d-none")
}

//Add Event for removing Cookie Consent box when accepted

	var RGPDBtt=document.getElementById("btnRGPD");
	RGPDBtt.addEventListener ("click",(e)=>{
		var cRG=document.getElementById("boxRGPD");
		setCookie('rgpda',1,1000);
		cRG.classList.add("d-none")
	})
	
// Add/Check coordinates for CIFO centres	

	if (!sessionStorage.cifoCoor){
		var xhr= new XMLHttpRequest();
		
		xhr.addEventListener('load',()=>{

			var cifoCoor= new Array();
			var objCentros = JSON.parse(xhr.responseText);

			for (var i=0;i<objCentros.length;i++){
				let data = new Object();
				data.nombre = objCentros[i].nombre;
				data.buzon = objCentros[i].buzon;
				data.telefono = objCentros[i].telefono;
				data.direccion = objCentros[i].direccion;
				data.descripcion = objCentros[i].descripcion;
				data.acceso = objCentros[i].acceso;
				data.horario = objCentros[i].horario;
				data.media = objCentros[i].media;
				data.lat = objCentros[i].lat;
				data.lng = objCentros[i].lng;
				
				cifoCoor.push(data);
			}
			sessionStorage.setItem('cifoCoor',JSON.stringify(cifoCoor));
			
		})	
		
		xhr.open("GET", "cifoCentros.js", true);
		xhr.send();
		
		
	}
