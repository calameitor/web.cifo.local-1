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
	


	