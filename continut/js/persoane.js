function incarcaPersoane()
{
	var div=document.getElementById("TabelPersoane");
	var table=document.createElement("TABLE");
	table.setAttribute("id", "tabelXML")
	table.style.borderColor="#80ffff";
	table.style.fontFamily=" Charcoal, sans-serif";
	var firstRow=table.insertRow();

	var cellNume1=firstRow.insertCell();
	cellNume1.innerHTML="Nume";
	cellNume1.style.color="#c2efef";

	var cellPrenume1=firstRow.insertCell();
	cellPrenume1.innerHTML="Prenume";
	cellPrenume1.style.color="#c2efef";

	var cellVarsta1=firstRow.insertCell();
	cellVarsta1.innerHTML="Vârsta";
	cellVarsta1.style.color="#c2efef";

	var cellOcup1=firstRow.insertCell();
	cellOcup1.innerHTML="Ocupație";
	cellOcup1.style.color="#c2efef";

	var cellLimbi1=firstRow.insertCell();
	cellLimbi1.innerHTML="Limbi cunoscute";
	cellLimbi1.style.color="#c2efef";


	div.innerHTML='';
	div.append(table);
	var xhttp = new XMLHttpRequest();
	var xmlDoc, txt, i;
	var nume, prenume, varsta, adresa,inaltime, ocupatie;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status==200){
			xmlDoc = this.responseXML;
			txt="";
						
			nume=xmlDoc.getElementsByTagName("nume");
			prenume=xmlDoc.getElementsByTagName("prenume");
			varsta=xmlDoc.getElementsByTagName("varsta");
			ocupatie=xmlDoc.getElementsByTagName("ocupatie");
			limbi=xmlDoc.getElementsByTagName("limbi_straine");
			
			
			for(i=0; i<nume.length; i++)
			{
				
				var linie=table.insertRow();

				txtNume=nume[i].childNodes[0].nodeValue;
				var cellNume= table.rows[i+1].insertCell();
				cellNume.innerHTML=txtNume;
				cellNume.style.color="#ff80ff";

				txtPrenume=prenume[i].childNodes[0].nodeValue;
				var cellPrenume= table.rows[i+1].insertCell();
				cellPrenume.innerHTML=txtPrenume;
				cellPrenume.style.color="#ff66ff";

				txtVarsta=varsta[i].childNodes[0].nodeValue;
				var cellVarsta= table.rows[i+1].insertCell();
				cellVarsta.innerHTML=txtVarsta;
				cellVarsta.style.color="#ff4dff";

				txtOcup=ocupatie[i].childNodes[0].nodeValue;
				var cellOcup= table.rows[i+1].insertCell();
				cellOcup.innerHTML=txtOcup;
				cellOcup.style.color="#ff33ff";

				txtL=limbi[i].childNodes[0].nodeValue;
				var cellLimbi= table.rows[i+1].insertCell();
				cellLimbi.innerHTML=txtL;
				cellLimbi.style.color="#ff1aff";

			}

		}
		
	};
		
	xhttp.open("GET", "../resurse/persoane.xml", true);
	xhttp.send();
}