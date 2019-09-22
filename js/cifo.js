/**
 * JS CIFO Web
 */

window.addEventListener("load", includeHTML);
window.addEventListener("load", Map);

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

function Map() {
	var mymap = L.map('cifoMap').setView([ 51.505, -0.09 ], 13);

	L.tileLayer(
					'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
					{
						maxZoom : 18,
						attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
								+ '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
								+ 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						id : 'mapbox.streets'
					}).addTo(mymap);

}
