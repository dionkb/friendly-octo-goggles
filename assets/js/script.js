var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var zipCode = document.getElementById('zipInput');
var countryCode = document.getElementById('inputGroupSelect01');
var searchEl = document.getElementById('searchBtn');
var todaysForecastEl = document.getElementById('todaysWeather');
var fiveDayEl = document.getElementById('fiveDayForecast');
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


// Allows user to search for a specific city
function displayLocation() {

    // To obtain lat and lon from zip and country user input
    fetch(('https://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode.value + ',' + countryCode.value + '&appid=' + weatherKey), {
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var latAndLon = {
            latReturned: data.lat,
            lonReturned: data.lon,
        }
        localStorage.setItem('latAndLon', JSON.stringify(latAndLon));
        var currentLatLon = JSON.parse(localStorage.getItem('latAndLon'));
        var currentLat = currentLatLon.latReturned;
        var currentLon = currentLatLon.lonReturned;  
        
        // To call the weather API using the lat and lon previously pulled
        fetch(('https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + weatherKey + '&units=imperial'), {
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Dynamically generates city name upon user input/search
            selectedCity.textContent = (data.city.name);

            // Dynamically generates elements for the "todaysWeather" and "fiveDayForecast" section
            for (var i = 0; i < 6; i++) {
                dateArray[i].textContent = currentMonth + '-' + (currentDay + i) + '-' + currentYear;
                var iconCode = data.list[i*7].weather[0].icon;
                var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                iconArray[i].setAttribute('src', iconUrl);
                tempArray[i].textContent = "Temperature: " + data.list[i*7].main.temp + '\u00B0' +'F';
                humidArray[i].textContent = "Humidity: " + data.list[i*7].main.humidity + '%';
                windArray[i].textContent = "Wind Speed: " + data.list[i*7].wind.speed + 'MPH';
            };
        });
    });
};  


searchEl.addEventListener('click', displayLocation);