async function getWeather() {

    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    const message = document.getElementById("message");
    const weather = document.getElementById("weather");
    const forecast = document.getElementById("forecast");
    const forecastTitle = document.getElementById("forecastTitle");

    // Clear previous data
    message.innerHTML = "";
    weather.innerHTML = "";
    forecast.innerHTML = "";
    forecastTitle.innerHTML = "";

    // Input validation
    if (city === "") {
        message.innerHTML = "Please enter a city name.";
        return;
    }

    message.innerHTML = "Loading weather...";

    try {

        // Find city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find city");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather data unavailable");
        }

        const data = await weatherResponse.json();

        message.innerHTML = "";

        // Current weather
        const current = data.current;

        const currentIcon = getWeatherIcon(current.weather_code);
        const currentDescription = getWeatherDescription(current.weather_code);

        weather.innerHTML = `
            <h2>${location.name}, ${location.country}</h2>

            <div class="weather-icon">
                ${currentIcon}
            </div>

            <p>${currentDescription}</p>

            <div class="temperature">
                ${current.temperature_2m}°C
            </div>

            <div class="details">
                <p>💧 ${current.relative_humidity_2m}%</p>
                <p>💨 ${current.wind_speed_10m} km/h</p>
            </div>
        `;

        // 5-day forecast
        forecastTitle.innerHTML = "5-Day Forecast";

        for (let i = 0; i < 5; i++) {

            const date = data.daily.time[i];
            const maxTemp = data.daily.temperature_2m_max[i];
            const minTemp = data.daily.temperature_2m_min[i];
            const code = data.daily.weather_code[i];

            const icon = getWeatherIcon(code);
            const description = getWeatherDescription(code);

            const forecastCard = document.createElement("div");

            forecastCard.className = "forecast-card";

            forecastCard.innerHTML = `
                <h3>${formatDate(date)}</h3>

                <div class="forecast-icon">
                    ${icon}
                </div>

                <p>${description}</p>

                <p class="forecast-temp">
                    ${maxTemp}°C / ${minTemp}°C
                </p>
            `;

            forecast.appendChild(forecastCard);
        }

    } catch (error) {

        message.innerHTML = "❌ " + error.message;

    }
}


// Weather icons
function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code === 1 || code === 2) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if (code === 45 || code === 48) {
        return "🌫️";
    }

    if (code >= 51 && code <= 67) {
        return "🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "❄️";
    }

    if (code >= 80 && code <= 82) {
        return "🌦️";
    }

    if (code >= 95) {
        return "⛈️";
    }

    return "🌤️";
}


// Weather description
function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear Sky";
    }

    if (code === 1 || code === 2) {
        return "Partly Cloudy";
    }

    if (code === 3) {
        return "Cloudy";
    }

    if (code === 45 || code === 48) {
        return "Foggy";
    }

    if (code >= 51 && code <= 67) {
        return "Rainy";
    }

    if (code >= 71 && code <= 77) {
        return "Snowy";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown";
}


// Format date
function formatDate(date) {

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}


// Press Enter to search
document.getElementById("cityInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});
