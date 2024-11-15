//~ Button Section
let btnSection = document.querySelector(".button-section");
let celsius = document.querySelector(".celsius");
let fahrenheit = document.querySelector(".fahrenheit");

let temperature = document.querySelector(".celsius-temp");

let celsiusTemp = 0;  // Declare variable to store Celsius value
let fahrenheitTemp = 0;  // Declare variable to store Fahrenheit value

// #Button Event Listeners
celsius.addEventListener("click", () => {
    celsius.style.background = "rgb(29, 161, 108)";
    celsius.style.color = "white";
    fahrenheit.style.background = "none";
    fahrenheit.style.color = "black";
    // Update temperature display in Celsius
    temperature.innerHTML = `${celsiusTemp} &deg;C`;
});

fahrenheit.addEventListener("click", () => {
    fahrenheit.style.background = "rgb(29, 161, 108)";
    fahrenheit.style.color = "white";
    celsius.style.background = "none";
    celsius.style.color = "black";
    //~ Update temperature display in Fahrenheit
    temperature.innerHTML = `${fahrenheitTemp.toFixed(2)} &deg;F`; // Display the Fahrenheit value
});

//~ Button Section 
let form = document.querySelector(".search-form");
const getWeatherDetails = async (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    let searchField = document.querySelector(".search-field").value.trim();

    // console.log(searchField);

    try {
        // Construct the API URL with the search field
        let URL =`https://api.weatherapi.com/v1/forecast.json?key=e0a38abf69e54870846103439240211&q=${searchField}&days=6&aqi=yes&alerts=yes`;
        let response = await fetch(URL);

        // Check if the response is valid (i.e., status 200)
        if (!response.ok) {
            throw new Error("Location not found. Please check the spelling or try a different location.");
        }

        let data = await response.json();

        // Check if the API response contains an error (e.g., invalid location)
        if (data.error) {
            alert("Location not found. Please check the spelling or try a different location.");
            return;
        }

        // Add Temperature 
        celsiusTemp = data.current.temp_c; // Store Celsius value
        fahrenheitTemp = (celsiusTemp * 9 / 5) + 32; // Convert to Fahrenheit
        temperature.innerHTML = `${celsiusTemp} &deg;C`; // Default to Celsius

        // Add location
        const location = document.querySelector(".location");
        location.innerHTML = `${data.location.name},<br/>${data.location.region}, ${data.location.country}`;

        // Add other weather details...
        const condition = document.querySelector(".clarity"); // Condition
        condition.innerHTML = `Clarity: ${data.current.condition.text}`;
        getWeatherIcon(data.current.condition.text);

        const rainChance = document.querySelector(".rain-chance"); // Rain Chance
        rainChance.innerHTML = `Rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain} &#37;`;

        const uvIndex = document.querySelector(".uv-index-text"); // UV Index
        uvIndex.innerHTML = `${data.current.uv}`;
        uvIndexShow(data.current.uv);

        const windSpeed = document.querySelector(".wind-speed"); // Wind Speed
        windSpeed.innerHTML = `${data.current.wind_kph}`;

        const visibility = document.querySelector(".visibility"); // Visibility
        visibility.innerHTML = `${data.current.vis_km}`;

        const humidity = document.querySelector(".humidity"); // Humidity
        humidity.innerHTML = `${data.current.humidity}`;
        getHumidityLevel(data.current.humidity);

        const sunRise = document.querySelector(".sunrise"); // Sun Rise
        sunRise.innerHTML = `${data.forecast.forecastday[1].astro.sunrise}`;

        const sunSet = document.querySelector(".sunset"); // Sun Set
        sunSet.innerHTML = `${data.forecast.forecastday[1].astro.sunset}`;

        // Four Days Forecast 
        fourDayData(data.forecast.forecastday);

        console.log(data);

    } catch (error) {
        // Handle network or API errors
        alert(error.message);
        console.error("Error fetching data: ", error);
    }

};


//& Call the function when the form is submitted 
// form.addEventListener("submit", getWeatherDetails);


//* Function to get current time and date
function getTimeDate() {
    let now = new Date();

    // Correctly declare the variables
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let amPm = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format and adjust for AM/PM
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Format minutes and seconds with leading zero if less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let dayString = days[now.getDay()];

    return `${dayString}, ${hour}:${minutes} ${amPm}`;
}

var dateTime = document.querySelector('.date-time');

// Update time every second using setInterval
setInterval(() => {
    dateTime.innerHTML = getTimeDate();
}, 1000);

// Set initial time
dateTime.innerHTML = getTimeDate();
//* Function to get current time and date end

// TODO: Temperature Image Show Start
function getWeatherIcon(clarity) {
    let clarityImage = document.querySelector(".clarity-icon");
    const iconBasePath = "./Assets/Icons/";
    // const nightIconPath = "./Assets/Icons/night/"

    switch (clarity) {
        case "Sunny":
            clarityImage.src = `${iconBasePath}clear.png`;
            break;
        case "Mist":
            clarityImage.src = `${iconBasePath}Mist1.webp`;
            break;
        case "Rainy":
            clarityImage.src = `${iconBasePath}rain.png`;
            break;
        case "Partly cloudy":
            clarityImage.src = `${iconBasePath}partly_cloud.png`;
            break;
        case "Fog":
            clarityImage.src = `${iconBasePath}Fog.png`;
            break;
        case "Patchy rain nearby":
            clarityImage.src = `${iconBasePath}sunny-rain-bg.png`;
            break;
        case "Moderate or heavy snow in area with thunder":
            clarityImage.src = `${iconBasePath}ThunderSnow.png`;
            break;
        case "Clear":
            clarityImage.src = `${iconBasePath}/night/nightMoon.png`;
            clarityImage.style.width = "100px"
            break;
        default:
            clarityImage.src = `${iconBasePath}partly_cloud.png`;
            break;
    }

}
// TODO: Temperature Image Show Ends



//? Uv Index 

function uvIndexShow(uvIndex) {
    let uvCategory = document.querySelector(".uv-category");
    let uvBox = document.querySelector(".uv-box");

    if (uvIndex >= 0 && uvIndex <= 2.9) {
        uvCategory.innerHTML = "Low";
        uvBox.style.backgroundColor = "green"; // Low UV index background color
    } else if (uvIndex >= 3 && uvIndex <= 5.9) {
        uvCategory.innerHTML = "Moderate";
        uvBox.style.backgroundColor = "yellow"; // Moderate UV index background color
    } else if (uvIndex >= 6 && uvIndex <= 10.9) {
        uvCategory.innerHTML = "High";
        uvBox.style.backgroundColor = "orange"; // High UV index background color
    } else {
        uvCategory.innerHTML = "Not recognize";
        uvBox.style.backgroundColor = "rgb(194, 194, 194)"; // Very High UV index background color
    }
}

//? UV index end

//! HUMIDITY Part STart

function getHumidityLevel(humidity) {
    let humidityCategory = document.querySelector(".humidity-text"); // Ensure this element exists in your HTML


    if (humidity < 0 || humidity > 100) {
        humidityCategory.innerHTML = "Invalid humidity value";
    } else if (humidity < 30) {
        humidityCategory.innerHTML = "Low";
    } else if (humidity < 50) {
        humidityCategory.innerHTML = "Comfortable";
    } else if (humidity < 60) {
        humidityCategory.innerHTML = "Moderate";
    } else if (humidity < 70) {
        humidityCategory.innerHTML = "High";
    } else {
        humidityCategory.innerHTML = "Very High";
    }

}

//! HUMIDITY Part END


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
}

//^ FourDays ForeCast Function Ends

//^ City Map Loading

maptilersdk.config.apiKey = 'xDfJ9onSkfpn8LrZ8BRb';

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: [78.9629, 20.5937], // Default center (India), will be updated by user's current location
    zoom: 5
});

//? Function to get the user's current location and set the map center
function setCurrentLocation() {
    if (navigator.geolocation) {
        // Try to get the current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Update map center to the user's current location
                map.setCenter([longitude, latitude]);
                map.setZoom(12); // Adjust the zoom level to your preference
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//? Set the default location to the user's current position
setCurrentLocation();

async function searchCity() {
    const city = document.querySelector(".search-field").value.trim();
    // console.log(city)
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        // Make the API request to MapTiler Geocoding API
        const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(city)}.json?key=xDfJ9onSkfpn8LrZ8BRb`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Geocoding request failed");
        }

        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const [log, lat] = data.features[0].geometry.coordinates;
            map.setCenter([log, lat]);
            map.setZoom(12); // Adjust zoom level if needed
            // console.log(`City found: ${city} at ${lat}, ${lng}`);
        } else {
            alert("City not found. Please check the name and try again.");
        }
    } catch (error) {
        console.error("Error during search:", error);
        alert("An error occurred while searching for the city. Please try again later.");
    }
}


//? Form submission and get weather report and map details of entered city

form.addEventListener("submit", function (event) {
    getWeatherDetails(event);  // Call the getReport function
    searchCity(event);  // Call the searchCity function
});



