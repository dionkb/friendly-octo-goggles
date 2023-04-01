var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var zipCode = document.getElementById('zipInput');
var countryCode = document.getElementById('inputGroupSelect01');
var searchEl = document.getElementById('searchBtn');
var todaysForecastEl = document.getElementById('todaysWeather');
var fiveDayEl = document.getElementById('fiveDayForecast');
var weatherImg = document.getElementById('weatherIcon');

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
        fetch(('https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLat + '&lon=' + currentLon + '&appid=' + weatherKey + '&units=imperial'), {
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentCity.textContent = (data.city.name);
            for (i = 0; i < 3; i++) {
                const todaysDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
                currentDate.textContent = todaysDate; 
                var iconCode = data.list[i].weather[i].icon;
                console.log(iconCode);
                var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                console.log(iconUrl);
                weatherImg.setAttribute('src', iconUrl);
                currentTemp.textContent = "Temperature: " + (data.list[i].main.temp) + '\u00B0' +'F';
                currentHumidity.textContent = "Humidity: " + (data.list[i].main.humidity) + '%';
                currentWind.textContent = "Wind Speed: " + (data.list[i].wind.speed) + 'MPH';
            }
            
        });  
    });
}

searchEl.addEventListener('click', searchLocation);