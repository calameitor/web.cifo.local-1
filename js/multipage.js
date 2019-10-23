/**
 * Loads common DOM: nav, header, footer
 */

window.addEventListener("DOMContentLoaded", includeHTML);

/*
 * IncludeHTML allows to handle MPA(Multiple Page Applications) in a modular
 * way. You define Nav.html, Header.html, Footer.html Modifications to those
 * affecto to all the application Simply include the tag with the property '<div
 * data-include="XXX.html"></div>' to insert code during execution
 */

function includeHTML(e) {

	var z, i, elmnt, file, xhttp;
	// loop through a collection of all HTML elements: 
	z = document.querySelectorAll("[data-include]");

	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		 //search for elements with a certain attribute: 
		file = elmnt.getAttribute("data-include");
		if (file) {
			// make an HTTP request using the attribute value as the file name: 
			xhttp = new XMLHttpRequest();
			xhttp.addEventListener('readystatechange', function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						
						elmnt.outerHTML = this.responseText;
					//start script injection										
						if (file == "Footer.html"){injectLibFromStack()};
					}
					if (this.status == 404) {
						elmnt.outerHTML = "Page not found.";
					}
					// remove the attribute, and call this function once more: 
					// elmnt.removeAttribute("data-include"); Not needed because
					// I do an outerHTML and remove it with the new HTML
					includeHTML();
				}
			});
			xhttp.open("GET", file, true);
			xhttp.send();
			// exit the function: 
			return;
		}
	}

};

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




/**
 * For the multi-page to work properly, it is necessary that the custom scripts
 * are loaded sequentially (and not in parallel, as the default does). First the script
 * that loads the common DOM, cookies, persistence, Views, Controller, and finally
 * the custom script
 */

 
  // JS files that need to be loaded one after the other

var libs = [
	'js/View.js',
    'js/Controller.js',
	'js/cookies.js',
    'js/persistence.js',    
    'js/custom.js',
    ];
  
  var injectLibFromStack = function(){
      if(libs.length > 0){
        
        //grab the next item on the stack
        var nextLib = libs.shift();
        var headTag = document.getElementsByTagName('head')[0];
        
        //create a script tag with this library
        var scriptTag = document.createElement('script');
        scriptTag.src = nextLib;
        
        //when successful, inject the next script
        scriptTag.onload = function(e){
          console.log("---> loaded: " + e.target.src);
          injectLibFromStack();
        };    
        
        //append the script tag to the <head></head>
        headTag.appendChild(scriptTag);
        console.log("injecting: " + nextLib);
      }
      else return;
  }
  

