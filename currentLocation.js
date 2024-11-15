let currentForm = document.querySelector(".search-form");

const getCurrentWeatherData = async (lat, long) => {
    // Construct the URL using lat and long
    let URL = `https://api.weatherapi.com/v1/forecast.json?key=e0a38abf69e54870846103439240211&q=${lat},${long}&days=6&aqi=yes&alerts=yes`;

    // Fetch the current weather data from the API
    let currentResponse = await fetch(URL);
    let currentData = await currentResponse.json();

    // // Select all fields for entering data
    const location = document.querySelector(".location");          // Current location 
    const condition = document.querySelector(".clarity");         // Condition 
    const rainChance = document.querySelector(".rain-chance");   // Rain Chance
    const uvIndex = document.querySelector(".uv-index-text");   // UV Index
    const windSpeed = document.querySelector(".wind-speed");  // WindSpeed
    const visibility = document.querySelector(".visibility"); // Visibility
    const humidity = document.querySelector(".humidity");   // Humidity
    const sunRise = document.querySelector(".sunrise");    // Sun Rise
    const sunSet = document.querySelector(".sunset");      // Sun Set

    // Add Temperature 
    celsiusTemp = currentData.current.temp_c; // Store Celsius value
    fahrenheitTemp = (celsiusTemp * 9 / 5) + 32; // Convert to Fahrenheit

    // Set initial temperature display to Celsius
    temperature.innerHTML = `${celsiusTemp} &deg;C`;

    // Add location
    location.innerHTML = `${currentData.location.name},<br/>${currentData.location.region}, ${currentData.location.country}`;

    // Add Condition and Condition images 
    condition.innerHTML = `Clarity: ${currentData.current.condition.text}`;
    getWeatherIcon(currentData.current.condition.text);

    // Add Rain Chance 
    rainChance.innerHTML = `Rain: ${currentData.forecast.forecastday[0].day.daily_chance_of_rain} &#37;`;

    // UV index text
    uvIndex.innerHTML = `${currentData.current.uv}`;

    // Add UV Index Level 
    uvIndexShow(currentData.current.uv);

    // Add Wind Speed 
    windSpeed.innerHTML = ` ${currentData.current.wind_kph}`;

    // Add Visibility
    visibility.innerHTML = `${currentData.current.vis_km}`;

    // Add Humidity And its level
    humidity.innerHTML = `${currentData.current.humidity}`;
    getHumidityLevel(currentData.current.humidity);

    // Add Sun Rise And Sun Set 
    sunRise.innerHTML = `${currentData.forecast.forecastday[1].astro.sunrise}`;
    sunSet.innerHTML = ` ${currentData.forecast.forecastday[1].astro.sunset}`;

    // Four Days Forecast 
    fourDayData(currentData.forecast.forecastday);
};


// Call getCurrentLocation() to get the user's current location


async function gotLocation(position) {
    // Get latitude and longitude from position
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Fetch the weather data using the obtained coordinates
    const result = await getCurrentWeatherData(latitude, longitude);
}

function failedToGet() {
    console.log("There was something wrong, or you denied location access");
}

function getCurrentLocation() {
    // Get current position using the geolocation API
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
}


//^ FourDays ForeCast Function Start 
function fourDayData(fourDays) {
    let dayElements = [".date-1", ".date-2", ".date-3", ".date-4", ".date-5"];
    let tempElements = [".first-day-temp", ".second-day-temp", ".third-day-temp", ".fourth-day-temp", ".fifth-day-temp"];
    let FourDayTempIcon = [".first-day-img", ".second-day-img", ".third-day-img", ".fourth-day-img", ".fifth-day-img"];

    for (let i = 1; i <= 5 && i < fourDays.length; i++) {
        document.querySelector(dayElements[i - 1]).textContent = fourDays[i].date;
        document.querySelector(tempElements[i - 1]).innerHTML = `${fourDays[i].day.avgtemp_c} &deg;C`;
        document.querySelector(FourDayTempIcon[i - 1]).src = `${fourDays[i].day.condition.icon}`;
    }
    console.log(fourDays)
}

//^ FourDays ForeCast Function Ends
getCurrentLocation();