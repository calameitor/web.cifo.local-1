/**
 * JS CIFO Web
 */

window.addEventListener("load", includeHTML);
window.addEventListener("load", myMap);

function includeHTML() {
	// console.log(page);
	var z, i, elmnt, file, xhttp;
	/* loop through a collection of all HTML elements: */
	z = document.querySelectorAll("[data-include]");

	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/* search for elements with a certain atrribute: */
		file = elmnt.getAttribute("data-include");
		if (file) {
			/* make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						// debugger;
						elmnt.outerHTML = this.responseText;
						activeMenu();
					}
					if (this.status == 404) {
						elmnt.outerHTML = "Page not found.";
					}
					/* remove the attribute, and call this function once more: */
					// elmnt.removeAttribute("data-include");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/* exit the function: */
			return;
		}
	}
	0
};

function activeMenu() {
	var i, breadc, active, uri;
	uri = window.location.pathname.split('/')[1];

	active = document.querySelectorAll('[data-active]');
	for (i = 0; i < active.length; i++) {
		if (active[i].dataset.active == uri) {
			active[i].className += " active "
		}
	}
	// debugger;
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

function myMap() {
	var mapProp = {
		center : new google.maps.LatLng(51.508742, -0.120850),
		zoom : 5,
	};
	var map = new google.maps.Map(document.getElementById("cifoMap"), mapProp);
}

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBz3_10TLdHSmRnu1R-zLuZgj6wJX43FKs&callback=myMap"></script>
