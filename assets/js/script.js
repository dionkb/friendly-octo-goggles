var todaysDate = dayjs();
var weatherKey = 'cd7ebc0fc09d55d92a5a8ac5ed133e74';
var cityName = 'Gainesville';
var zipCode = '32605';
var countryCode = 'US';
// var latitude = returnedLat;
// var longitude = returnedLon;

// TESTING
// var h1El = document.getElementById("test");
// h1El.textContent = (todaysDate);
$('#test').text(todaysDate.format('MMM DD, YYYY'));



// To obtain lat and long
fetch(('http://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode + ',' + countryCode + '&appid=' + weatherKey), {
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
    localStorage.setItem("geoCoords", JSON.stringify(latAndLon));
});


// To call the weather app after the lat and long have been found
// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=weatherKey', {
// //   method: 'GET', //GET is the default.
// //   credentials: 'same-origin', // include, *same-origin, omit
// //   redirect: 'follow', // manual, *follow, error
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
