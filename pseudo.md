# 06 Server-Side APIs: Weather Dashboard

## My Pseudocode

~~* Set up base html, css, js. Link together~~  
~~* Link html to openweathermap API, other API as needed (JQuery, Bootstrap, etc.)~~  
* Make sections that will be filled later:  
    ~~* CONTENT: Main section to display weather in currently selected city~~  
    ~~* SEARCH: Aside to allow for searchbar~~  
    * HISTORY: Aside to list saved searches for quick access to multiple cities  
~~* Add search bar first, learn how to use that from openweathermap~~  
~~* Use localStorage to ensure that searches are saved in history and displayed from storage~~  
~~* Selecting a city must display that city's current:~~   
    ~~* Name~~  
    ~~* Date~~  
    ~~* Icon for weather conditions~~  
    ~~* Temperature~~  
    ~~* Humidity~~  
    ~~* Wind Speed~~  
* Viewing the future of that city will show:  
    * 5-day forecast of same parameters as above.  
* Clicking on a city from search history will load the parameters for that city. 

NEW ISSUES ARISEN:  
* Date displayed is for current location, what if they search a city across the globe?

---

## Grading README, Key Points

Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](..//Assets/06-server-side-apis-homework-demo.png)

## Grading Requirements

* The usual requiremnts, plus:

* Uses the OpenWeather API to retrieve weather data.

* Uses `localStorage` to store persistent data.


- - -
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
