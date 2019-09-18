/**
 * JS CIFO Web
 */

window.addEventListener("load",includeHTML);


function includeHTML() {
  //console.log(page);
  var z, i,  elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
 
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("data-include");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
        	  elmnt.outerHTML = this.responseText;
        	  activeMenu();
          }
          if (this.status == 404) {elmnt.outerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          //elmnt.removeAttribute("data-include");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

function activeMenu(){
	var active, uri;
	uri =  window.location.pathname.split( '/' )[1];
	debugger;
	active = document.querySelectorAll("[target=uri]")
}













