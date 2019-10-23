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

activeMenu();

if (window.location.pathname == "/Contacto.html") {

	Map();
	formValidation();	
}

// Include all the constants, variables, objects needed for the execution of the
// functions

var testing;

// ---------------------------------------------------




// Inserting Breadcrumb bootstrap type in the Header automatically. Only one
// level
function activeMenu(e) {
	var i, breadc, active, uri;
	uri = window.location.pathname.split('/')[1];

	active = document.querySelectorAll('[data-active]');
	for (i = 0; i < active.length; i++) {
		if (active[i].dataset.active == uri) {
			active[i].className += " active "
		}
	}
	
	breadc = document.querySelectorAll('[aria-label="breadcrumb"]');
	if (breadc[0]) {
		if (uri == "Home.html") {
			breadc[0].innerHTML = '<ol class="breadcrumb align-items-center"> <li class="breadcrumb-item active" aria-current="page"><i class="fa fa-home" style="color:#00A4D5"></i>Inicio</li></ol>';
		} else {
			urishort = uri.split('.')[0]
			breadc[0].innerHTML = '<ol class="breadcrumb align-items-center"><li class="breadcrumb-item" aria-current="page"><i class="fa fa-home" style="color:#00A4D5"></i>Inicio</li><li class="breadcrumb-item active" aria-current="page">'
					+ urishort + "</li></ol>";
		}
	}
}

// -------------------------------------------------------------------------------


function Map(e) {
	// debugger;
			var mymap = L.map('cifoMap').setView([ 41.4168484, 2.1336355 ], 15);

		L
				.tileLayer(
						'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
						{
							maxZoom : 18,
							attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
									+ '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
									+ 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
							id : 'mapbox.streets'
						}).addTo(mymap);

		var marker = L.marker([ 41.4168484, 2.1336355 ]).addTo(mymap);

		// var popup = L.popup().setLatLng([ 41.4168272, 2.0635956
		// ]).setContent(
		// "I am a standalone popup.").openOn(mymap);
	}


// Form validation using 
function formValidation(e){
	var form = document.contactForm1;    
	
	form.lastElementChild.addEventListener("click",(e)=>{
		//Stopping form submission
		e.preventDefault();
		var error=0; // initial non-error
		
		//cleaning up all previous checks before form re-check
		for (i=0;i<form.length;i++){
			form[i].classList.remove("is-valid","is-invalid");
			}
							
		// trimming variable to guarantee check OK
		form[0].value.trim();
	    
		//check all fields from 0 to n-1
	    if(/w/.test(form[0].value)){
	    	form[0].classList.add("is-invalid");
	    	error=1;
	    }else{form[0].classList.add("is-valid")};
	    			   	
	    if(form[1].value == ""){
	    	form[1].classList.add("is-invalid");
	    	error=1;
	    }else{form[1].classList.add("is-valid")};
	    
	    if(form[2].value == ""){
	    	form[2].classList.add("is-invalid");
	    	error=1;
	    }else{form[2].classList.add("is-valid")};
	    
	    if(form[3].value == ""){
	    	form[3].classList.add("is-invalid");
	    	error=1;
	    }else{form[3].classList.add("is-valid")};
	    
	    	    
	    //Depending on overall status, decide about submission
	    if (error){return}
	    else{
	    	form.submit();
	    }
	   
});
}

