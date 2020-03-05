window.addEventListener('load',()=>{

    let long;
    let lat;
    let temperatureDescription =document.querySelector('.tempeature-description');
    let temperatureDegree =document.querySelector('.tempeature-degree');
    let locationTimezone =document.querySelector('.location-timezone');
    let tempeatureSection = document.querySelector(".tempeature");
    let tempeatureSpan = document.querySelector(".tempeature span");

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = proxy+'https://api.darksky.net/forecast/ab037ff9287c055844953b19c44abecd/'+lat+','+long;
            
            
            fetch(api)
            .then(respone=>{
               return respone.json();
            })
   
            .then(data =>{
              const {temperature,summary,icon} = data.currently; 
              //Set DOM Elements from the API
              temperatureDegree.textContent = temperature;
              temperatureDescription.textContent=summary;
              locationTimezone.textContent= data.timezone;
              
              let celsius = (temperature-32) * (5/9);

              setIcons(icon,document.querySelector(".icon"));
              //change temp to celsius // farenheit

              tempeatureSection.addEventListener("click",()=>{
                if(tempeatureSpan.textContent === "F"){
                    tempeatureSpan.textContent ="C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }
                else{
                    tempeatureSpan.textContent ="F";
                    temperatureDegree.textContent = temperature;
                }
              })
            });
        });
    }

    function setIcons(icon,iconID){

        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace("-","_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});