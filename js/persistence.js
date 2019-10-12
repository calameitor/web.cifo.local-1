//CHECkCHECKCHECK
if (!detectCookie('rgpda')){
	debugger;
	var cRG=document.getElementById("boxRGPD");
	cRG.classList.remove("d-none")
}

window.addEventListener("load",InitEvent)

function InitEvent(e){
	var RGPDBtt=document.getElementById("btnRGPD");
	RGPDBtt.addEventListener ("click",(e)=>{
		var cRG=document.getElementById("boxRGPD");
		setCookie('rgpda',1,1000);
		cRG.classList.add("d-none")
	})
	
}

	