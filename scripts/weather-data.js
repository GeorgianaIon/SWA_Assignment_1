import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./HttpClient.js";
import { constructCard } from "../generateHtml/construct-card.js";
import model from "./model.js"

const { getFetchAsync } = HttpClient();
const resultsContainer = document.getElementsByClassName("weather-data")[0];
const selectCity = document.getElementById("city-select");

const getWeatherForAllCities = async () => {
    return await Promise.all([
        getFetchAsync(HORSENS_ROUTE),
        getFetchAsync(AARHUS_ROUTE),
        getFetchAsync(COPENHAGEN_ROUTE),
    ]);
};


//all weather data
const weatherData = await getWeatherForAllCities();

selectCity.addEventListener('change', () => {
    const selectedCity = selectCity.value;
    displayWeatherData(selectedCity);
});

//weather data for each city
const [horsensWeather, aarhusWeather, copenhagenWeather] =
    await getWeatherForAllCities();

const displayWeatherData = (selectedCity) => {
    resultsContainer.innerHTML = '';

    const selectedWeather = getSelectedWeatherData(selectedCity);

    selectedWeather.forEach(element => {
        resultsContainer.appendChild(constructCard(element));
    });
};

const getSelectedWeatherData = (selectedCity) => {
    switch (selectedCity) {
        case 'horsens':
            return model(horsensWeather).latestMeasurements;
        case 'aarhus':
            return model(aarhusWeather).latestMeasurements;
        case 'copenhagen':
            return model(copenhagenWeather).latestMeasurements;
        default:
            return [];
    }
};

displayWeatherData('horsens');

