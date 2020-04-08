let lista_produse=[];
var w;
if(typeof(Worker) !== "undefined") {
	if (typeof(w) == "undefined") {
		w = new Worker("worker.js");
		trimite=function(){	
			data=localStorage.length;
			w.postMessage(data);
		};
		
	}
	
	w.onmessage=function(event){
		// var linie=document.getElementById("TabelCump").insertRow();
		// var cellID=linie.insertCell();
		// cellID.innerHTML=
		console.log(event.data);

	};
}
else{
	alert("Sorry, your browser does not support Web Workers...");
}

setInterval(trimite, 1000);

class Produs {
	constructor(id, nume, cantitate) {
		this.id = id;
		this.nume = nume;
		this.cantitate = cantitate;
	}
}

function adaugalistaCump()
{
	var nume=document.getElementById("numeCump").value;
	var cantitate=document.getElementById("cant").value;
	
	
	if (typeof(Storage) !== "undefined")
	{
		lista_produse=localStorage.getItem('produse');
		if(lista_produse == null){
			lista_produse=[];
		}
		else {
			lista_produse=JSON.parse(lista_produse);
		}

		lista_produse=lista_produse.map(p => new Produs(p.id, p.nume, p.cantitate));
		let last_id=localStorage.getItem('last_id');
		if(last_id==null){
			last_id=1;
		}
		else{
			last_id=JSON.parse(last_id);
		}

		let id=last_id;
		lista_produse.push(new Produs(id, nume, cantitate));
		localStorage.setItem('produse', JSON.stringify(lista_produse));
		localStorage.setItem('last_id', JSON.stringify(last_id+1));

	} else {
			alert("Sorry! No Web Storage support..");
	  }

}


