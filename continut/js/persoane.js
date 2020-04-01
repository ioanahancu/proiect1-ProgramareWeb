function incarcaPersoane()
{
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status==200){
			document.getElementById("continut").innerHTML= this.responseXML;
		}
	};
		
	xhttp.open("GET", 'resurse/persoane.xml', true);
	xhttp.send();
}