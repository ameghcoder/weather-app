const $id = e => document.getElementById(e);
const $ = e => document.querySelector(e);
const $all = e => document.querySelectorAll(e);

const API_KEY = "38d18342722c698d0cd1b175d7aab074";
const API = `https://api.openweathermap.org/data/2.5/weather?q=COUNTRY_NAME&APPID=${API_KEY}`

const weatherImg = {   
    "Atmosphere": "./public/assets/image/Atmosphere.jpg",    
    "Haze": "./public/assets/image/Atmosphere.jpg",    
    "Mist": "./public/assets/image/Atmosphere.jpg",    
    "Clear": "./public/assets/image/Clear.jpg",
    "Clouds": "./public/assets/image/Clouds.jpg",
    "Drizzle": "./public/assets/image/Drizzle.jpg",
    "Rain": "./public/assets/image/Rain.jpg",
    "Snow": "./public/assets/image/Snow.jpg",
    "Thunderstorm": "/public/assets/image/Thunderstorm.jpg"
};

const getWeatherInfo = (value, api) => {
    fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        let bgImgUrl = weatherImg[response["weather"][0]["main"]];
        $("body").style.backgroundImage = `url(${bgImgUrl})`;
        $id("weatherWidget").style.backgroundImage = `url(${bgImgUrl})`;

        $id("temperature").innerText = response["main"]["temp"];
        $id("cityName").innerText = value;
        $id("humidity").innerText = response["main"]["humidity"];
        $id("pressure").innerText = response["main"]["pressure"];
        $id("wind").innerText = response["wind"]["speed"];
        $id("weatherIcon").setAttribute("src", `https://openweathermap.org/img/wn/${response["weather"][0]["icon"]}@4x.png`)
    })
    .catch((err) => {
        console.log(err);
    })
}

const init = () => {
    const searchBtn = $id("searchWeatherBtn");
    const searchInput = $id("search-input");

    searchBtn.addEventListener("click", () => {
        let value = searchInput.value;
        let FINAL_API = API.replace("COUNTRY_NAME", value);

        getWeatherInfo(value, FINAL_API);
    })
}

document.readyState == "interactive" ? init() : document.addEventListener("DOMContentLoaded", () => init())