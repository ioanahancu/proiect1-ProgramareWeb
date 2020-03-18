function getInfo()
{
    document.getElementById("data").innerHTML=Date();
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