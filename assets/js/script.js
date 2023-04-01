var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var zipCode = document.getElementById('zipInput');
var countryCode = document.getElementById('inputGroupSelect01');
var searchEl = document.getElementById('searchBtn');
var todaysForecastEl = document.getElementById('todaysWeather');
var fiveDayEl = document.getElementById('fiveDayForecast');
var test;

// TESTING
var h1El = document.getElementById('test');
h1El.textContent = ('BIG BOY');

// Allows user to search for a specific city
function searchLocation() {

    // USED FOR TESTING PURPOSES ONLY
    console.log(zipCode.value);
    console.log(countryCode.value);

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
        fetch(('https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + weatherKey), {
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

        fiveDayEl.textContent = (data);
    });

}

searchEl.addEventListener('click', searchLocation);