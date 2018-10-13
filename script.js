// keyapi : cc93c5e0ed63d39279c7218d068aa015

// how to get weather form gps coordinate
// https://www.wunderground.com/weather/api/d/docs?d=data/geolookup&_ga=2.163874488.60878751.1539123921-912824572.1539123921#examples
// GET : http://api.wunderground.com/api/Your_Key/geolookup/q/37.776289,-122.395234.json
//lat={lat}&lon={lon}



    let lgt = document.getElementById("longitude");
    let lat = document.getElementById("latitude");
    let city = document.getElementById("city");
    let description = document.getElementById("description");
    let temperature = document.getElementById("temperature");
    let tMin = document.getElementById("tMin");
    let tMax = document.getElementById("tMax");
    let pressure = document.getElementById("pressure");
    let country = document.getElementById("country");
    let img = document.getElementById("img");

    const getLoc = new Promise((resolve, reject)=>{
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
                reject( "Geolocation is not supported by this browser.");
            }
        }
        function showPosition(position) {
            resolve([position.coords.latitude, position.coords.longitude]);
        }
        getLocation();
    });

     async function getWeather (coordS) { //coordS
        try{
            const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordS[0]}&lon=${coordS[1]}&units=metric&appid=cc93c5e0ed63d39279c7218d068aa015`);
            // const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.4616696&lon=-0.1693785&units=metric&appid=cc93c5e0ed63d39279c7218d068aa015`);
            const status = result.status;
            console.log(status);
            const data = await result.json();
            return data;
        }catch(error){
            console.log("error");
            return error;
        }
    }

    let weather;
    getLoc.then(coord=>{
        lgt.innerHTML = coord[1];
        lat.innerHTML = coord[0];
        return getWeather(coord);
    }).then( result =>{
        console.log(result);

        city.innerHTML = `${result.name}, ${result.sys.country}`;
        description.innerHTML = result.weather[0].description;
        temperature.innerHTML = `${result.main.temp} ˚C`;
        img.src =`http://openweathermap.org/img/w/${result.weather[0].icon}.png`;
        tMax.innerHTML = `${result.main.temp_max} ˚C`;
        tMin.innerHTML = `${result.main.temp_min} ˚C`;
        pressure.innerHTML = `${result.main.pressure} hPa`;
        
        // console.log(result.main.temp);
        // console.log(result.main.humidity);
        // console.log(result.main.pressure);
        // console.log(result.main.temp_max);
        // console.log(result.main.temp_min);
    }).catch(error=>{
        console.log(error);
    })




/*

async function getWeather(){
    try{
        const we = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lgt}&units=metric&appid=cc93c5e0ed63d39279c7218d068aa015`);
        const result = await we;
        const data = await result.json();
        console.log(data);
    } catch(error){

    }
    //const we = fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=cc93c5e0ed63d39279c7218d068aa015');
    return data;
}
getWeather();
*/