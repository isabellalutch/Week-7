

let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.45&longitude=-79.68&current=temperature_2m,weather_code&timezone=America%2FToronto";

let skyCard = document.getElementById("skyCard");
let weatherMessage = document.getElementById("weatherMessage");
let temperature = document.getElementById("temperature");
let condition = document.getElementById("condition");
let journalText = document.getElementById("journalText");
let refreshButton = document.getElementById("refreshButton");
let statusText = document.getElementById("status");

async function getWeather() {

    statusText.textContent = "Checking the sky...";
    refreshButton.disabled = true;

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Weather request failed");
        }

        const data = await response.json();

        let currentTemp = data.current.temperature_2m;
        let weatherCode = data.current.weather_code;

  
        temperature.textContent = currentTemp + "°C";

       
        if (weatherCode === 0) {

            skyCard.style.backgroundColor = "#c7dff0";
            weatherMessage.textContent = "A clear and bright sky.";
            condition.textContent = "Clear Sky";

            journalText.textContent =
                "The sky is very sunny today. Enjoy the nice weather.";

        } else if (weatherCode >= 1 && weatherCode <= 3) {

       
            skyCard.style.backgroundColor = "#d9dce0";
            weatherMessage.textContent = "A cloudy day.";
            condition.textContent = "Cloudy";

            journalText.textContent =
                "There are lots of clouds in the sky today. Not every day can be sunny, unfortunately";

        } else if (weatherCode === 45 || weatherCode === 48) {

           
            skyCard.style.backgroundColor = "#d5d8d5";
            weatherMessage.textContent = "The sky feels a little quieter.";
            condition.textContent = "Foggy";

            journalText.textContent =
                "The sky is covered with a grey layer of fog. It feels calm and still.";

        } else if (
            (weatherCode >= 51 && weatherCode <= 67) ||
            (weatherCode >= 80 && weatherCode <= 82) ||
            (weatherCode >= 95 && weatherCode <= 99)
        ) {

     
            skyCard.style.backgroundColor = "#aebdca";
            weatherMessage.textContent = "A rainy kind of day.";
            condition.textContent = "Rainy";

            journalText.textContent =
                "Rain is falling outside. It is a bit gloomy.";

        } else if (
            (weatherCode >= 71 && weatherCode <= 77) ||
            (weatherCode >= 85 && weatherCode <= 86)
        ) {

           
            skyCard.style.backgroundColor = "#e5ebef";
            weatherMessage.textContent = "A little winter wonder.";
            condition.textContent = "Snowy";

            journalText.textContent =
                "Snowflakes are falling from the sky. It looks magical.";

        } else {

            skyCard.style.backgroundColor = "#d6dfe5";
            weatherMessage.textContent = "Every sky has a story.";
            condition.textContent = "Changing Weather";

            journalText.textContent =
                "The weather is always changing. Take a moment to look up and notice the sky.";

        }

        statusText.textContent = "The sky is up to date.";

    } catch (error) {

      
        console.error("Error:", error);

        weatherMessage.textContent = "The sky is unavailable.";
        condition.textContent = "Unable to load weather";
        temperature.textContent = "--°C";

        journalText.textContent =
            "We couldn't check the sky right now. Please try again.";

        statusText.textContent = "Something went wrong.";

    } finally {

        refreshButton.disabled = false;

    }

}


refreshButton.addEventListener("click", getWeather);

getWeather();
