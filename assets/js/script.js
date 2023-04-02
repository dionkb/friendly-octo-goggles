// Variables used to track city input and API key
var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var cityName = document.getElementById('cityInput')
var searchEl = document.getElementById('searchBtn');

// Variables used to display weather conditions based on city input
var todaysForecastEl = document.getElementById('todaysWeather');
var fiveDayEl = document.getElementById('fiveDayForecast');

// Variables used to display parameters of local weather based on city search
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

// Variables used for localStorage setting/getting
var searchHistory = document.getElementById('historyContainer');
var searchedCities = [];


// ------------------------------------------- END OF VARIABLES ----------------------------------------------------------- 


// -------------------------------------------- START OF CODE -------------------------------------------------------------


// Displays the last searched city pulled from local storage so the screen populates upon entry
function displayLast() {
    var recentlySearched = JSON.parse(localStorage.getItem('savedCities'));
    var lastSearched = recentlySearched[recentlySearched.length - 1]; 
    displayLocation(lastSearched);
}
displayLast();

// Loads previously stored items to display upon re-entering page if needed. Limits to 5 cities
function loadCities() {
    for (i = 0; i < 5; i++) {
        var searchedCities = localStorage.getItem('savedCities');
        searchedCities = JSON.parse(searchedCities) || [];
        var citiesList = document.createElement('ul');
        var previousCity = document.createElement('a');
        previousCity.setAttribute('class', 'historyItem');
        citiesList.textContent = "";
        previousCity.textContent = searchedCities[i]
        searchHistory.append(citiesList);
        searchHistory.append(previousCity);
        var previousCitiesEl = document.querySelectorAll('.historyItem');
    }
    previousCitiesEl.forEach(function(historyItem) {
        historyItem.addEventListener('click', function() {
            var searchable = historyItem.textContent;
            displayLocation(searchable);
        });
    })
}
loadCities();

// Allows user to search for a specific city
function displayLocation(cityChosen) {

    // To obtain weather from user input
    fetch(('http://api.openweathermap.org/data/2.5/forecast?q=' + cityChosen + '&appid=' + weatherKey + '&units=imperial'), {
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

         // Dynamically generates elements for the "todaysWeather" and "fiveDayForecast" section
        function displayWeather() {
            selectedCity.textContent = data.city.name;
            for (var i = 0; i < 6; i++) {
                dateArray[i].textContent = currentMonth + '-' + (currentDay + i) + '-' + currentYear;
                var iconCode = data.list[i*7].weather[0].icon;
                var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                iconArray[i].setAttribute('src', iconUrl);
                tempArray[i].textContent = "Temperature: " + data.list[i*7].main.temp + '\u00B0' +'F';
                humidArray[i].textContent = "Humidity: " + data.list[i*7].main.humidity + '%';
                windArray[i].textContent = "Wind Speed: " + data.list[i*7].wind.speed + 'MPH';
            };
        };
        displayWeather();

        // Stores the search history in local storage
        var searchedCity = data.city.name;
        searchedCities.push(searchedCity);
        localStorage.setItem('savedCities', JSON.stringify(searchedCities));
    });
};


// Sets up eventListener for clickable elements
searchEl.addEventListener('click', function() {
    if (cityName.value) {
        displayLocation(cityName.value);
    }
    else {
        alert("Please enter a city");
    }
});
