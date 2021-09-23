

/**
Function to hanlder version change in select box
*/

function handleVersionChange(){
	var oSelect = document.getElementById("selectVersionChange");
	version = oSelect.options[oSelect.selectedIndex].value;
	loc = document.location;
	url = loc.protocol + "//" + loc.host;
	url = loc.href;
	console.log(loc);
	//document.location.href = document.protocol + "://" +
}