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

const minAndMaxTempContainer = document.getElementById("minAndMaxTemp");

const updateTemperatureInfo = (selectedCity) => {
    minAndMaxTempContainer.innerHTML = '';

    const selectedWeather = getSelectedWeatherData(selectedCity);
    const selectedHistoricalWeather = selectedWeather.historicalMeasurements;

    const minTempElement = document.createElement('div');
    minTempElement.textContent = `Minimum temperature in ${selectedCity}: ${selectedWeather.minTemperature}`;
    minAndMaxTempContainer.appendChild(minTempElement);

    const maxTempElement = document.createElement('div');
    maxTempElement.textContent = `Maximum temperature in ${selectedCity}: ${selectedWeather.maxTemperature}`;
    minAndMaxTempContainer.appendChild(maxTempElement);

    const avgWindSpeedElement = document.createElement('div');
    avgWindSpeedElement.textContent = `Average wind speed in ${selectedCity}: ${selectedWeather.avgWindSpeed}`;
    minAndMaxTempContainer.appendChild(avgWindSpeedElement);

    const totalPrecipitationElement = document.createElement('div');
    totalPrecipitationElement.textContent = `Total precipitation in ${selectedCity}: ${selectedWeather.totalPrecipitation}`;
    minAndMaxTempContainer.appendChild(totalPrecipitationElement);
};

updateTemperatureInfo('Horsens')


