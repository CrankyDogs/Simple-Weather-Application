const api = {
    key : "66413debd8a5f559b3fe4ba2016ef913",
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.getElementById('search-bar');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.key === "Enter") {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    console.log(weather.message);
    if (weather.message === "city not found") {
        // searchbox.innerHTML = weather.message;
        alert(weather.message);
    }
    let now = new Date();
    let main_temp = document.getElementById('main-temp');
    main_temp.innerHTML =`${Math.round(weather.main.temp)}°C`;
    let city = document.getElementById('place');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let date = document.getElementById('date');
    date.innerHTML = dateBuilder(now);
    let condition = document.getElementById('weather-condition');
    condition.innerHTML = `${weather.weather[0].main}`;
}

function dateBuilder(d){
    //create an array consisting name of all months


    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = day[d.getDate()];
    let month = months[d.getMonth()];
    let years = d.getFullYear();
    return `${days} ${month} ${years}`;
}