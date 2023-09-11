import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./HttpClient.js";
import { constructCard } from "../generateHtml/construct-card.js";
import { weatherDetailsCard } from "../generateHtml/weather-details-card.js";
import model from "./model.js"

const { getFetchAsync } = HttpClient();
const resultsContainer = document.getElementsByClassName("weather-data")[0];
const weatherDetailsContainer = document.getElementsByClassName("weather-details")[0];
const selectCity = document.getElementById("city-select");

const getWeatherForAllCities = async () => {
    return await Promise.all([
        getFetchAsync(HORSENS_ROUTE),
        getFetchAsync(AARHUS_ROUTE),
        getFetchAsync(COPENHAGEN_ROUTE),
    ]);
};


//all weather data
// const weatherData = await getWeatherForAllCities();

selectCity.addEventListener('change', () => {
    const selectedCity = selectCity.value;
    displayLatestWeatherData(selectedCity);
    updateTemperatureInfo(selectedCity);
});

//weather data for each city
const [horsensWeather, aarhusWeather, copenhagenWeather] =
    await getWeatherForAllCities();

const displayLatestWeatherData = (selectedCity) => {
    resultsContainer.innerHTML = '';

    const selectedWeather = getSelectedWeatherData(selectedCity);
    const selectedLatestWeather = selectedWeather.latestMeasurements;

    selectedLatestWeather.forEach(element => {
        resultsContainer.appendChild(constructCard(element));
    });
};

const getSelectedWeatherData = (selectedCity) => {
    switch (selectedCity) {
        case 'Horsens':
            return model(horsensWeather);
        case 'Aarhus':
            return model(aarhusWeather);
        case 'Copenhagen':
            return model(copenhagenWeather);
        default:
            return [];
    }
};

displayLatestWeatherData('Horsens');

const updateTemperatureInfo = (selectedCity) => {
    weatherDetailsContainer.innerHTML = '';

    const selectedWeather = getSelectedWeatherData(selectedCity);
    weatherDetailsContainer.appendChild(weatherDetailsCard(0, selectedWeather.minTemperature));
    weatherDetailsContainer.appendChild(weatherDetailsCard(1, selectedWeather.maxTemperature));
    weatherDetailsContainer.appendChild(weatherDetailsCard(2, selectedWeather.avgWindSpeed));
    weatherDetailsContainer.appendChild(weatherDetailsCard(3, selectedWeather.totalPrecipitation));
};

updateTemperatureInfo('Horsens')


