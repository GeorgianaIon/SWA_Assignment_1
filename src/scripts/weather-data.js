import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./HttpClient.js";
import { constructCard } from "../generateHtml/construct-card.js";
import model from "./model.js"

const { getFetchAsync, getXmlHttpRequest } = HttpClient();
const resultsContainer = document.getElementsByClassName("weather-data")[0];
const weatherDetailsContainer = document.getElementsByClassName("weather-details")[0];
const selectCity = document.getElementById("city-select");

// const getWeatherForAllCities = async () => {
//     return await Promise.all([
//         getFetchAsync(HORSENS_ROUTE),
//         getFetchAsync(AARHUS_ROUTE),
//         getFetchAsync(COPENHAGEN_ROUTE),
//     ]);
// };


const getWeatherForAllCities = async () => {
    return await Promise.all([
        getXmlHttpRequest(HORSENS_ROUTE, parseWeatherData),
        getXmlHttpRequest(AARHUS_ROUTE, parseWeatherData),
        getXmlHttpRequest(COPENHAGEN_ROUTE, parseWeatherData)
    ]);
};

const parseWeatherData = (data) => {
    return data;
};

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
        resultsContainer.appendChild(constructCard({ weatherData: element }));
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
    weatherDetailsContainer.appendChild(constructCard({ type: 'temperature', text: 'Min Temperature', value: selectedWeather.minTemperature }));
    weatherDetailsContainer.appendChild(constructCard({ type: 'temperature', text: 'Max Temperature', value: selectedWeather.maxTemperature }));
    weatherDetailsContainer.appendChild(constructCard({ type: 'wind speed', text: 'Average Wind Speed', value: selectedWeather.avgWindSpeed }));
    weatherDetailsContainer.appendChild(constructCard({ type: 'precipitation', text: 'Total Precipitation', value: selectedWeather.totalPrecipitation }));
};

updateTemperatureInfo('Horsens')


