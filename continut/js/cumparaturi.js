let lista_produse=[];
var w;
if(typeof(Worker) !== "undefined") {
	if (typeof(w) == "undefined") {
		w = new Worker("worker.js");
		trimite=function(){	
			data=localStorage.getItem('last_id');
			data=JSON.parse(data)-1;
			w.postMessage(data);
			//console.log('Mesaj transmis catre worker lungime='+data);
		};
		
	}
	
	w.onmessage=function(event){
		
		console.log('Mesaj primit de la worker: '+event.data);
		var linie=document.getElementById("ListaCump").insertRow();
		data=localStorage.getItem('last_id');
		data=JSON.parse(data)-2;

		var cellID=linie.insertCell();
		cellID.innerHTML=data+1;

		var cellNume=linie.insertCell();
		cellNume.innerHTML=lista_produse[data].nume;

		var cellCantitate=linie.insertCell();
		cellCantitate.innerHTML=lista_produse[data].cantitate;


		

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

function getLista()
{
    var table=document.getElementById("ListaCump");
    var first_line=table.insertRow();

    var cell1=first_line.insertCell();
    cell1.innerHTML="Nr.";
    var cell2=first_line.insertCell();
    cell2.innerHTML="Nume Produs";
    var cell3=first_line.insertCell();
    cell3.innerHTML="Cantitate";

    var last_id=localStorage.getItem('last_id');
    last_id=JSON.parse(last_id);

    var produse=localStorage.getItem('produse');
	produse=JSON.parse(produse);
	produse=produse.map(p => new Produs(p.id, p.nume, p.cantitate));

    for(i=0; i<last_id-1; i++)
    {
        var new_line=table.insertRow();
        var cellNr=new_line.insertCell();
        cellNr.innerHTML=i+1;
        var cellNume=new_line.insertCell();
        cellNume.innerHTML=produse[i].nume;
        var cellCant=new_line.insertCell();
        cellCant.innerHTML=produse[i].cantitate;
    }

}
