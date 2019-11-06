/**
 * Form Check - Functions checking field validity. All initiated by fcXXXX Needs
 * to be added to the click button main event
 */

// Checks regular scripts like name, surnames, open string texts, comments,...
function fcString(form, a) {
	var patt = /^\w{2,}$/
	return (patt.test(form[a].value))
}

// Checks no empty value in selection
function fcNoEmpty(form, a) {
	return !(form[a].value == "")
}

// Checks if email format
function fcEmail(form, a) {
	var patt = /^[^@]{1,}[@][\w\d.]{2,}[.].{2,3}$/
	return (patt.test(form[a].value))
}

// Checks if password format
function fcPwd(form, a) {
	var patt = /^.{4,40}$/
	return (patt.test(form[a].value))
}

// Basic check for phone number
function fcPhone(form, a) {
	var patt = /^[\d-+()\s]{1,20}$/
	return (patt.test(form[a].value))
}

// Checks if button checked/marked
function fcChecked(form, a) {
	return (form[a].checked)
}
// Checks if radiobutton checked
function fcRadioButton(ButtonName) {

	return (ButtonName.value != "")

}
// Checks if date is introduced
function fcDateCheck(form, a) {

	inputDate = form[a].value;

	checkDate = inputDate.split('/');
	// inverting from dd/mm/yyyy to mm/dd/yyyy
	d = new Date(checkDate[1] + '/' + checkDate[0] + '/' + checkDate[2]);
	day = d.getDate();
	month = d.getMonth();
	year = d.getYear()

	return ((day === +checkDate[0]) && (month + 1 === +checkDate[1]) && (year + 1900 === +checkDate[2]));
}
// Checks if multiselection has a parameter selected
function fcMulSelect(form, a) {
	
	for (var i=0; i<form[a].options.length; i++){
		form[a].options[i].selected=true;
	}
	return(form[a].options.length !=0)
}





// Manages buttons in Right-Left Selectors
function seleccion(e) {
	var listaOrigen = document.getElementById('selectOrigen');
	var listaDestino = document.getElementById('selectDestino');
	var objButton = e.currentTarget;

	switch (objButton.value) {
	case ">":
		moveright();
		break;
	case ">>":
		moveallright();
		break;
	case "<":
		moveleft();
		break;
	case "<<":
		moveallleft();
		break;
	}

	function moveright() {
		for (i = 0; i < listaOrigen.length; i++) {
			if (listaOrigen[i].selected == true) {
				listaDestino.appendChild(listaOrigen[i]);
				i--
			}

		}
	}
	function moveallright() {
		for (i = 0; i < listaOrigen.length; i++) {
			listaDestino.appendChild(listaOrigen[i])
			i--;
		}
	}
	function moveleft() {
		for (i = 0; i < listaDestino.length; i++) {
			if (listaDestino[i].selected == true) {
				listaOrigen.appendChild(listaDestino[i]);
				i--
			}

		}
	}
	function moveallleft() {
		for (i = 0; i < listaDestino.length; i++) {
			listaOrigen.appendChild(listaDestino[i])
			i--;
		}
	}

}
