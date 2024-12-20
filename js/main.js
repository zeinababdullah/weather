const searchInput = document.querySelector(".searchInput");
let day = new Date();
let daysInWeek =["sunday","monday","tuesday","wednesday","thursday","friday","saterday"];
for (let i = 0; i < daysInWeek.length; i++) {
    if(i >6 ){
        i=0;
        daysInWeek[day.getDay()[i]]
        
    }else{
        daysInWeek[day.getDay()[i]];
    }
    
}
//!----------current Day---------------------
const currentDayName = document.querySelector(".weatherShow .currentDayName");
const currentDayMonth = document.querySelector(".weatherShow .currentDayMonth");
const country = document.querySelector(".country");
const currentDegree = document.querySelector(".currentDegree");
const currentStautsImg = document.querySelector(".currentStautsImg");
const currentWeatherStatus = document.querySelector(".currentWeatherStatus");
const humidity = document.querySelector(".humidity");
const windKph = document.querySelector(".windKph");
const winddDirection = document.querySelector(".winddDirection");

//!---------------------next day----------------
const nextDayName = document.querySelector(".nextDayName");
const tomorrowImg = document.querySelector(".tomorrowImg");
const tomorrowMaxDegree = document.querySelector(".tomorrowMaxDegree");
const tomorrowMinDegree = document.querySelector(".tomorrowMinDegree");
const nextWeatherStatus = document.querySelector(".nextWeatherStatus");

//!---------------------next tomorrow----------------
const tomorrowNextDay = document.querySelector(".tomorrowNextDay");
const tomorrowNextImg = document.querySelector(".tomorrowNextImg");
const nextTomorrowMaxDegree = document.querySelector(".nextTomorrowMaxDegree");
const nextTomorrowMinDegree = document.querySelector(".nextTomorrowMinDegree");
const nextTomorrowStatus = document.querySelector(".nextTomorrowStatus");




async function getCurrentWeather(name) {
    let getData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d905a9bd56084b3d91515243241712&q=${name}&days=3`);
    let finalGetData = await getData.json();
    console.log(finalGetData);
    // console.log(finalGetData.location.name);
    // console.log(finalGetData.current.temp_c);
    return finalGetData;
}


function displayToDay(data) {
    currentDayMonth.innerHTML = data.forecast.forecastday[1].date;
    currentDayName.innerHTML = daysInWeek[day.getDay()];
    country.innerHTML = data.location.name;
    currentDegree.innerHTML = data.current.temp_c + `<sup>${"o"}</sup>${"c"}`;
    currentStautsImg.innerHTML = data.current.condition.icon;
    currentWeatherStatus.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity;
    windKph.innerHTML = data.current.wind_kph;
    winddDirection.innerHTML = data.current.wind_dir;
}
async function display(name = "cairo") {
    finalGetData = await getCurrentWeather(name);
    displayToDay(finalGetData);
    displayTomorrow(finalGetData);
    nextTomorrow(finalGetData);
}


function displayTomorrow(data) {
    nextDayName.innerHTML = daysInWeek[day.getDay()+1];
    tomorrowNextImg.innerHTML = data.forecast.forecastday[1].day.condition.icon;
    tomorrowMaxDegree.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowMinDegree.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    nextWeatherStatus.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

function nextTomorrow(data) {
    tomorrowNextDay.innerHTML = daysInWeek[day.getDay()+2];
    tomorrowImg.innerHTML = data.forecast.forecastday[2].day.condition.icon;
    nextTomorrowMaxDegree.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    nextTomorrowMinDegree.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    nextTomorrowStatus.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

searchInput.addEventListener("change", function (e) {
    display(e.target.value);
});


