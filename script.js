const API_KEY = "5ce3b8bed982343b9e6d82def2805968";

const weatherIcons = {
    Thunderstorm:"⛈️",
    Drizzle:"🌦️",
    Rain:"🌧️",
    Snow:"❄️",
    Clear:"☀️",
    Clouds:"☁️"
};

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) return;

    const loader = document.getElementById("loader");
    const errorMsg = document.getElementById("errorMsg");
    const weatherInfo = document.getElementById("weatherInfo");

    loader.style.display = "block";
    errorMsg.style.display = "none";
    weatherInfo.style.display = "none";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("weatherIcon").textContent =
            weatherIcons[data.weather[0].main] || "🌤";

        document.getElementById("temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("feelsLike").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("dateTime").textContent =
            new Date().toLocaleDateString();

        loader.style.display = "none";
        weatherInfo.style.display = "block";

    } catch (error) {

        loader.style.display = "none";
        errorMsg.style.display = "block";
    }
}