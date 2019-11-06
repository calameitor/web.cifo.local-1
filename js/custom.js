/**
 * JS CIFO Web
 */
/*
 * JS Events to handle during Frontend execution First setting the ones to
 * execute in every page, then "if" ones are for specific pages "Init" functions
 * used to define especific events into the page (buttons, hovers, etc)
 */


//window.addEventListener("DOMContentLoaded", includeHTML);

//window.addEventListener("DOMContentLoaded", includeHTML);

//window.addEventListener("DOMContentLoaded", Init);

//activeMenu();

if (window.location.pathname == "/Contacto.html") {

	Map();
	formValidation();	
}
if (window.location.pathname == "/Registrarse.html") {

	regValidation();	
}

// Include all the constants, variables, objects needed for the execution of the
// functions

var testing;



// -------------------------------------------------------------------------------

// Map in contact form using Leaflet and mapbox
function Map(e) {
		
	
		document.getElementById("outerMap").innerHTML = '<div id="cifoMap" style="width: 100%; height: 400px"></div>'
		var mymap = L.map('cifoMap').setView([ 41.6, 1.5 ], 8);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
						{
							maxZoom : 18,
							attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
									+ '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
									+ 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
							id : 'mapbox.streets'
						}).addTo(mymap);

		var Coor = JSON.parse(sessionStorage.getItem('cifoCoor'));
		
		for (let i=0; i<Coor.length; i++){
		
			var marker = L.marker([Coor[i].lat,Coor[i].lng]).addTo(mymap);
			marker.addEventListener('click',()=>{
				 var popup = L.popup().setLatLng([Coor[i].lat, Coor[i].lng
					 ]).setContent(
					 Coor[i].nombre).openOn(mymap);
			});
		}
		
		/* Obtenemos la geo del usuario y la gestionamos */
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(showPosition, showError);
		  } else { 
		    document.getElementById("llegarBtn").classList.add('d-none');
		  }
		
		function showError(error) {
			document.getElementById("llegarBtn").classList.add('d-none');
			}
		function showPosition(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;

			var streetIcon = L.icon({
				iconUrl: "img/icon-street-2.png",
				iconSize:     [70, 70], // size of the icon
				iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
			
			var marker = L.marker([lat,lon],{icon: streetIcon}).addTo(mymap).bindPopup("Estas aquí");
			
			}
		/* Gestionamos/pintamos la ruta */
			document.getElementById('centro').addEventListener('change',()=>{

				document.getElementById("zonaMapa").classList.remove('col-lg-6');

				var sel = event.target.value-1;
				var Coor = JSON.parse(sessionStorage.getItem('cifoCoor'));
				var latCentro = +Coor[sel].lat;
				var lngCentro = +Coor[sel].lng;
				navigator.geolocation.getCurrentPosition((position)=>{
					L.Routing.control({
						  waypoints: [
						    L.latLng(position.coords.latitude, position.coords.longitude),
						    L.latLng(latCentro, lngCentro)
						  ],
						  routeWhileDragging: true
						}).addTo(mymap);
					
				});
			});
};

// Form validation using  formCheckFunctions.js
function formValidation(e){
	var form = document.contactForm1;    
	
	form[5].addEventListener("click",(e)=>{
		e.preventDefault();
		var error=0;
	//Remove all the previous checks in the form in order to recheck them
		for (i=0;i<form.length;i++){form[i].classList.remove("is-valid","is-invalid")}
							
	//Block for rechecking form elements					    
	    
	    if(fcString(form,0)){form[0].classList.add("is-valid")}else{form[0].classList.add("is-invalid");error=1};
	    if(fcString(form,3)){form[3].classList.add("is-valid")}else{form[3].classList.add("is-invalid");error=1};
	    
	    
	    if(fcEmail(form,2)){form[2].classList.add("is-valid")}else{form[2].classList.add("is-invalid");error=1};
	    if(form[1].value){
	    	if(fcPhone(form,1)){form[1].classList.add("is-valid")}else{form[1].classList.add("is-invalid");error=1}
	    }
	    // if error, return, otherwise submit function 
	    if (error){return}
	    else{
	    	grecaptcha.ready(function() {
    			grecaptcha.execute('6LfoRcAUAAAAAJGq54PPTbU4p_KKJXpxqK-j30eR', {action: 'contacto'}).then(function(token) {
    				form[4].value = token;
    				form.submit();
    		    });;
			});
	    	
	    }				   	     
	});
	
}

//Registration validation using formCheckFunctions.js

function regValidation(e){
	var form = document.regForm;    

	form[9].addEventListener("click",(e)=>{
		e.preventDefault();
		var error=0;
	
	//Remove all the previous checks in the form in order to recheck them
		for (i=0;i<form.length;i++){form[i].classList.remove("is-valid","is-invalid")}
							
	//Block for rechecking form elements					    
	    
	    if(fcString(form,1)){form[1].classList.add("is-valid")}else{form[1].classList.add("is-invalid");error=1};
	    if(form[2].value){
	    	if(fcPhone(form,2)){form[2].classList.add("is-valid")}else{form[2].classList.add("is-invalid");error=1}
	    }
	    if(fcEmail(form,3)){form[3].classList.add("is-valid")}else{form[3].classList.add("is-invalid");error=1};

	    if(fcPwd(form,4)){form[4].classList.add("is-valid")}else{form[4].classList.add("is-invalid");error=1};
	    
	    if(form[4].value == form[5].value && form[5].value){form[5].classList.add("is-valid")}else{form[5].classList.add("is-invalid");error=1};
	
	    if(fcChecked(form,6)){form[6].classList.add("is-valid")}else{form[6].classList.add("is-invalid");error=1};
	    
	    // if error, return, otherwise submit function 
	    if (error){return}
	    else{
	    	grecaptcha.ready(function() {
    			grecaptcha.execute('6LfoRcAUAAAAAJGq54PPTbU4p_KKJXpxqK-j30eR', {action: 'registry'}).then(function(token) {
    				form[7].value = token;
    				form.submit();
    		    });;
			});
	    	
	    }				   	     
	});
	
}

