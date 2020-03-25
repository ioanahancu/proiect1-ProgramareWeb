function getInfo()
{
    var myVar = setInterval(myTimer, 1000);

    function myTimer() {
    var d = new Date();
    document.getElementById("data").innerHTML = d;
    }

    document.getElementById("url").innerHTML=location.href;
    document.getElementById("loc").innerHTML=getLocation();    
    document.getElementById("numeB").innerHTML=navigator.appName;
    document.getElementById("versB").innerHTML=navigator.appVersion;
    document.getElementById("so").innerHTML= navigator.platform; 

    var x=document.getElementById("loc");
    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
  
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }
}

function loto()
{
    var nr1=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr2=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr3=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr4=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr5=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr6=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr7=Math.floor((Math.random()*255)).toString(16).toUpperCase();
    var nr8=Math.floor((Math.random()*255)).toString(16).toUpperCase();

    var nrI1=document.getElementById("nr1").value.toString().toUpperCase();
    var nrI2=document.getElementById("nr2").value.toString().toUpperCase();
    var nrI3=document.getElementById("nr3").value.toString().toUpperCase();
    var nrI4=document.getElementById("nr4").value.toString().toUpperCase();
    var nrI5=document.getElementById("nr5").value.toString().toUpperCase();
    var nrI6=document.getElementById("nr6").value.toString().toUpperCase();
    var nrI7=document.getElementById("nr7").value.toString().toUpperCase();
    var nrI8=document.getElementById("nr8").value.toString().toUpperCase();

    document.getElementById("numereLoto").innerHTML="Numerele câștigătoare sunt: " 
        + nr1 + " " + nr2 + " " + nr3 + " " + nr4 + " "
        + nr5 + " " + nr6 + " " + nr7 + " " + nr8;

    var numereIntroduse=[nrI1, nrI2, nrI3, nrI4, nrI5, nrI6, nrI7, nrI8];
    var numereExtrase=[nr1, nr2, nr3, nr4, nr5, nr6, nr7, nr8];
    document.getElementById("numereNimerite").innerHTML=numereIntroduse;



    var i;
    var j;
    var k=0;
    for(i=0; i<8; i++)
    {
        var v =numereIntroduse[i]
        for(j=0; j<8; j++)
          if( v == numereExtrase[j])
            {
                k+=1;
            }
        
    }

    document.getElementById("numereNimerite").innerHTML="Ați nimerit " + k + " numere.";
    
}

function getMousePos(canvas, evt)
{
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
    
}

document.getElementById("plansa").addEventListener('click', desenare);
function desenare(event)
{
    var colDesen=document.getElementById("culoareDesen").value;
    var colFill=document.getElementById("culoareFill").value;

    var c=document.getElementById("plansa");
    var ctx=c.getContext('2d');
    ctx.fillStyle = colFill;

    var mousePos1=getMousePos(c, event);
    //var message1 = "Message1 Mouse coord: " + mousePos1.x + ',' + mousePos1.y;
    //document.getElementById("mousePos").innerHTML=message1;

    
    
    c.addEventListener('click', 
    function(evt){
        var mousePos=getMousePos(c, evt);
        //var message = "Message 2Mouse coord: " + mousePos.x + ',' + mousePos.y;
        //document.getElementById("mousePos").innerHTML=message;
        ctx.beginPath();
        ctx.moveTo(mousePos1.x, mousePos1.y);
        ctx.lineTo(mousePos1.x, mousePos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.lineTo(mousePos.x, mousePos1.y);
        ctx.lineTo(mousePos1.x, mousePos1.y);
        ctx.strokeStyle = colDesen;
        ctx.stroke();

        ctx.fillStyle=colFill;
        ctx.fill();
    }, 
    {once:true});
    

}

function linieNoua(){
    var pozitie=document.getElementById("poz").value;
    var culoare=document.getElementById("culoareCelula").value;
    var table=document.getElementById("t4");
    
    var nrCol=table.rows[0].cells.length;

    var linie=table.insertRow(pozitie);

    while(nrCol)
    {
        var cell= linie.insertCell();
        cell.innerHTML="linie nouă";
        nrCol--;
        cell.style.backgroundColor=culoare;
    
    }
    

   // alert(celule.length);
   // document.getElementById("t4").rows[pozitie].cells.style.backgroundColor="blue";*/
   
}

function coloanaNoua()
{
    var pozitie=document.getElementById("poz").value;
    var culoare=document.getElementById("culoareCelula").value;
    var table=document.getElementById("t4");

    var nrLinii=table.rows.length;
    while(nrLinii)
    {
        var cell= table.rows[nrLinii-1].insertCell(pozitie);
        cell.innerHTML="coloană nouă";
        nrLinii--;
        cell.style.backgroundColor=culoare;
    }
}