
var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var searchHistory = [];
var lastSearched = "";
var cityName = document.getElementById('cityInput');
var searchContainer = document.getElementById('searchItems');
var searchEl = document.getElementById('searchBtn');
var selectedCity = document.getElementById('currentCity');
var selectedDate = document.querySelectorAll('#currentDate');
var dateArray = [...selectedDate];
var dateFull = new Date();
var currentDay = dateFull.getDate();
var currentMonth = dateFull.getMonth() + 1;
var currentYear = dateFull.getFullYear();
var selectedIcon = document.querySelectorAll('#weatherIcon');
var iconArray = [...selectedIcon];
var selectedTemp = document.querySelectorAll('#currentTemp');
var tempArray = [...selectedTemp];
var selectedHumidity = document.querySelectorAll('#currentHumidity');
var humidArray = [...selectedHumidity];
var selectedWind = document.querySelectorAll('#currentWind');
var windArray = [...selectedWind];


let getWeather = function(searchCity) {

    // To obtain weather based on city from user input
    fetch(('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName.value + '&appid=' + weatherKey), {
    })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } 
        else {
            alert("Error: " + response.statusText);
        }
    })  
};


function searchCity(event) {
    event.preventDefault();

    // get value from input element
    let searchedCity = cityName.value.trim();

    // check if the search field has a value
    if(searchedCity) {
        getWeather(searchedCity);
    } else {
        alert("Enter a city");
    }
};

// function to display the information collected from openweathermap.org
function displayWeather(weatherInfo) {

    selectedCity.textContent = weatherInfo.city.name;
    for (var i = 0; i < 6; i++) {
        dateArray[i].textContent = currentMonth + '-' + (currentDay + i) + '-' + currentYear;
        var iconCode = weatherInfo.list[i*7].weather[0].icon;
        var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
        iconArray[i].setAttribute('src', iconUrl);
        tempArray[i].textContent = "Temperature: " + weatherInfo.list[i*7].main.temp + '\u00B0' +'F';
        humidArray[i].textContent = "Humidity: " + weatherInfo.list[i*7].main.humidity + '%';
        windArray[i].textContent = "Wind Speed: " + weatherInfo.list[i*7].wind.speed + 'MPH';
    };

    // save the last city searched
    lastSearched = weatherInfo.name;

    // save to the search history using the api's name value for consistancy
    // this also keeps searches that did not return a result from populating the array
    saveSearchHistory(weatherInfo.name);

    
};

// function to save the city search history to local storage
function saveSearchHistory(city) {
    if(!searchHistory.includes(city)){
        searchHistory.push(city);
        $("#historyContainer").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    } 

    // save the searchHistory array to local storage
    localStorage.setItem("savedCities", JSON.stringify(searchHistory));

    // save the lastCitySearched to local storage
    localStorage.setItem("lastSearched", JSON.stringify(lastSearched));

    // display the searchHistory array
    loadHistory();
};

// function to load saved city search history from local storage
function loadHistory() {
    searchHistory = JSON.parse(localStorage.getItem("savedCities"));
    lastSearched = JSON.parse(localStorage.getItem("lastSearched"));

    // if nothing in localStorage, create an empty searchHistory array and an empty lastCitySearched string
    if (!searchHistory) {
        searchHistory = []
    }

    if (!lastSearched) {
        lastSearched = ""
    }

    // clear any previous values from th search-history ul
    searchContainer.replaceChildren();

    // for loop that will run through all the citys found in the array
    for(i = 0 ; i < searchHistory.length ;i++) {

        // add the city as a link, set it's id, and append it to the search-history ul
        searchContainer.append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
};

// load search history from local storage
loadHistory();

// start page with the last city searched if there is one
if (lastSearched != ""){
    getWeather(lastSearched);
}


// Sets up eventListener for clickable elements
searchEl.addEventListener('click', searchCity);