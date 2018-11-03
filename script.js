// openweather
// keyapi : cc93c5e0ed63d39279c7218d068aa015

// https://timezonedb.com/account
// keyapi : C995R0ZBAI8X

// http://api.timezonedb.com/v2.1/get-time-zone?key=C995R0ZBAI8X&format=json&by=position&lat=51.46169&lng=-0.16944

// how to get weather form gps coordinate
// https://www.wunderground.com/weather/api/d/docs?d=data/geolookup&_ga=2.163874488.60878751.1539123921-912824572.1539123921#examples
// GET : http://api.wunderground.com/api/Your_Key/geolookup/q/37.776289,-122.395234.json
//lat={lat}&lon={lon}



    let lgt = document.getElementById("longitude");
    let lat = document.getElementById("latitude");
    let timestamp = document.getElementById("timestamp");
    let city = document.getElementById("city");
    let description = document.getElementById("description");
    let temperature = document.getElementById("temperature");
    let tMin = document.getElementById("tMin");
    let tMax = document.getElementById("tMax");
    let pressure = document.getElementById("pressure");
    let country = document.getElementById("country");
    let img = document.getElementById("img");
    let humidity = document.getElementById("humidity");
    let el = document.querySelector(".search-button-width > button");
    let wind = document.getElementById("wind");
    let deg = document.getElementById("deg");
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");
    let inputEl = document.getElementById("city_search");
    let date = document.querySelector(".info-left-date > p > span");
    

    const getURL = weatherId =>{
        const listIDs = {
            thunderstorm :[200,201,202,210,211,212,221,230,231,232],
            drizzle : [300,301,302,310,311,312,313,314,321],
            rain : [500,501,502,503,504,511,520,521,522,531],
            snow : [600,601,602,611,612,615,616,620,621,622],
            mist : [701,711,721,731,741,751,761,762,771,781] ,
            clear : [800],
            clouds : [801,802,803,804]
        }
        const urls = {
            thunderstorm : 'https://farm2.staticflickr.com/1962/43831848590_43d50cd7d9_o.jpg',
            drizzle : 'https://farm2.staticflickr.com/1972/44736436535_db913ec246_o.jpg',
            rain : 'https://farm2.staticflickr.com/1970/30709194147_52c17224c4_o.jpg',
            snow : 'https://farm2.staticflickr.com/1901/45650709141_42132b3436_o.png',
            mist : 'https://farm2.staticflickr.com/1906/45651150571_7a451b9776_o.png',
            clear : 'https://farm2.staticflickr.com/1918/30709184417_cb4092808a_o.jpg',
            clouds : 'https://farm2.staticflickr.com/1913/43831839750_828344c75c_o.png'
        }
         for ( let main in listIDs){
           if ( listIDs[main].includes(weatherId)){
               return urls[main];
           }
        }
    }

    const converter = ((lg, lt) => {
        const lgDeg = String(Math.abs(lg)).split('.')[0];  // 0 degree
        const ltDeg = String(Math.abs(lt)).split('.')[0];  // 51 degree

        const lgMin = Math.floor((Math.abs(lg) - Number.parseFloat(lgDeg))*60);
        const ltMin = Math.floor((Math.abs(lt) - Number.parseFloat(ltDeg))*60);

        let lgSec = (((Math.abs(lg) - Number.parseFloat(lgDeg))*60) - lgMin)*60;
        let ltSec = (((Math.abs(lt) - Number.parseFloat(ltDeg))*60) - ltMin)*60;
        lgSec = lgSec.toFixed(4);
        ltSec = ltSec.toFixed(4);

        const lgHem = ( lg > 0 ? 'E' : 'W');
        const ltHem = ( lt > 0 ? 'N' : 'S');
        // String(lg)
        return [lgDeg+'° '+lgMin +'\' '+ lgSec+'\'\' '+lgHem, ltDeg+'° '+ltMin+'\' '+ltSec+'\'\' '+ltHem];
    })
    
    const updateUI = (result, typeSearch) => {
        if ( typeSearch === "citySearch"){
            const DMSCoord = converter( result.coord.lon,result.coord.lat);
            lgt.innerHTML = DMSCoord[1];
            lat.innerHTML = DMSCoord[0];
            
        }
        const url = getURL(result.weather[0].id);
        document.body.style.backgroundImage = `url(${url})`; // Mist
        document.querySelector('.frame').style.visibility = 'visible';
        // date.innerText = convertUTCDate(result.dt);
        city.innerText = `${result.name}, ${result.sys.country}`;
        description.innerText = result.weather[0].description;
        temperature.innerText = `${result.main.temp} ˚C`;
        img.src =`https://openweathermap.org/img/w/${result.weather[0].icon}.png`;
        tMax.innerText = `${result.main.temp_max} ˚`;
        tMin.innerText = `${result.main.temp_min} ˚`;
        pressure.innerText = `${result.main.pressure} hPa`;
        humidity.innerText = `${result.main.humidity} %`;
        wind.innerText = `${result.wind.speed} m/s`;
        deg.innerHTML =`<i class="wi wi-wind from-${result.wind.deg}-deg"></i>`;
        const sunriseDate = new Date(result.sys.sunrise*1000);
        const sunriseHour = sunriseDate.getHours();
        const sunriseMin = sunriseDate.getMinutes();
        const sunsetDate = new Date(result.sys.sunset*1000);
        const sunsetHour = sunsetDate.getHours();
        const sunsetMin = sunsetDate.getMinutes();
        sunrise.innerText =`${sunriseHour}h${sunriseMin}`;
        sunset.innerText =`${sunsetHour}h${sunsetMin}`;
    }

    inputEl.addEventListener('click', event=>{
        event.target.style.color = "#777";
        event.target.value = "";
    })
    const throwError = errorMsg => {
        inputEl =  document.getElementById("city_search");
        inputEl.style.color = "red";
        inputEl.value = errorMsg;
        
    }
    const convertUTCDate = date => {
        const myDate = new Date( date );
        // return myDate.toGMTString();
        const days = { 0 : "Sunday", 1 : "Monday", 2 : "Tuesday", 3 : "Wednesday", 4 : "Thursday", 5 : "Friday", 6 : "Saturday"};
        const months = { 0 : "January", 1 : "February", 2 : "March", 3 : "April", 4 : "May", 5 : "June", 6 : "July", 7 : "August", 8 : "September", 9 : "October", 10 : "November", 11 : "December"};
        return `${ days[myDate.getDay()]} ${myDate.getDate()} ${months[myDate.getMonth()]}`
        // console.log(myDate.toLocaleString());
    }

    /** getLocation function return longitude and latitude gps coordinate. values will be used with fetch API */
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
            const data = await result.json();
            console.log(coordS);
            return data;
        }catch(error){
            console.log("error");
            return error;
        }
    }

    getLoc.then(coord=>{
        const DMSCoord = converter(coord[1],coord[0]);
        lgt.innerHTML = DMSCoord[1];
        lat.innerHTML = DMSCoord[0];
        // getTimeZone( Number.parseFloat(coord[1].toFixed(5)), Number.parseFloat(coord[0].toFixed(5)));
        getTimeZone( coord[1], coord[0]);
        // getTimeZone(-0.1694557, 51.461735399999995 );
        return getWeather(coord);
    }).then( result =>{
        updateUI(result, "local");
    }).catch(error=>{
        console.log(error);
    })


    el.addEventListener('click', event =>{
        searchWeather(event);
    })
    inputEl.addEventListener('keypress', event =>{
        if (event.code === 13 || event.which === 13) {
            searchWeather(event);
        }
    })
    const searchWeather = (_event)=>{
        const input = document.getElementById("city_search").value;       
        if (input.length > 2){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=cc93c5e0ed63d39279c7218d068aa015`)
            .then( result => {
                return result.json();
            })
            .then( result => {
                // console.log(result);
                getTimeZone( result.coord.lon, result.coord.lat );
                updateUI(result,"citySearch");
            }).catch( error=>{
               throwError('City not found !')
                return error;
            })
        } else {
           throwError('Not a valid City !');
        }
    }

    const getTimeZone = (lg, lt)=>{
        fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=C995R0ZBAI8X&format=json&by=position&lat=${lt}&lng=${lg}`)
        .then( result =>{
            return result.json();
        })
        .then( result =>{
            timestamp.innerText = `${result.formatted.split(' ')[1]}`;
            const date1 = new Date(result.formatted);
            date.innerText = `${convertUTCDate(date1)}`;
        })
    }






