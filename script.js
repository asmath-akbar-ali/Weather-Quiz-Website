const apikey = "8110f53172c44af5f6ab8d4729ebe377";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById('search');
const searchBtn = document.querySelector(".search-box");
const weatherIcon = document.getElementById("weather-icon");
const weatherSection = document.getElementById("weather-section");

weatherSection.style.display = "none";

searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});

function showDetails() {
    const city = searchBox.value.trim();
    if (city === "") return;

    fetch(apiUrl + city + `&appid=${apikey}`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            weatherSection.style.display = "block";

            document.querySelector(".city").innerText = `${data.name}`;
            document.querySelector(".temperature").innerText = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity-percentage").innerText = `${data.main.humidity}%`;
            document.querySelector(".wind-percentage").innerText = `${data.wind.speed} km/s`;

            let condition = data.weather[0].main.toLowerCase();
            switch (condition) {
                case "clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "snow":
                    weatherIcon.src = "images/snow.png";
                    break;
                case "mist":
                case "haze":
                case "fog":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "";
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}
