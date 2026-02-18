// ⚠️ Replace with NEW regenerated key after testing
const API_KEY = "beba96e822ce93161c7dffe3641893b0";

const input = document.getElementById("cityInput");
const suggestionsBox = document.getElementById("suggestions");
const result = document.getElementById("result");
const loader = document.getElementById("loader");

let debounceTimer;

// Autocomplete while typing
input.addEventListener("keyup", () => {
    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if(query.length < 2){
        suggestionsBox.innerHTML = "";
        return;
    }

    debounceTimer = setTimeout(() => {
        fetchCities(query);
    }, 500);
});

function fetchCities(query){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=7&appid=${API_KEY}`)
    .then(res => {
        if(!res.ok) throw new Error("City fetch error");
        return res.json();
    })
    .then(data => {
        suggestionsBox.innerHTML = "";

        if(data.length === 0){
            suggestionsBox.innerHTML = "<div class='suggestion-item'>No cities found</div>";
            return;
        }

        data.forEach(city => {
            const div = document.createElement("div");
            div.classList.add("suggestion-item");
            div.textContent = `${city.name}${city.state ? ", "+city.state : ""}, ${city.country}`;
            div.onclick = () => getWeather(city.lat, city.lon, div.textContent);
            suggestionsBox.appendChild(div);
        });
    })
    .catch(() => {
        suggestionsBox.innerHTML = "<div class='suggestion-item'>Error fetching cities</div>";
    });
}

function getWeather(lat, lon, cityName){
    suggestionsBox.innerHTML = "";
    input.value = cityName;
    loader.style.display = "block";
    result.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(res => {
        if(!res.ok) throw new Error("Weather fetch error");
        return res.json();
    })
    .then(data => {
        loader.style.display = "none";
        result.innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>☁ Condition: ${data.weather[0].description}</p>
            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;
    })
    .catch(() => {
        loader.style.display = "none";
        result.innerHTML = "<p class='error'>Error fetching weather data</p>";
    });
}