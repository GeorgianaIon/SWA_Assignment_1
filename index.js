import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./scripts/HttpClient.js";
import { constructCard } from "./generateHtml/construct-card.js";
import model from "./model.js"
import { MinTemperature, MaxTemperature } from "./model.js"

const { getWeatherData } = HttpClient();
const resultsContainer = document.getElementsByClassName("weather-data")[0];


const getWeatherForAllCities = async () => {
    return await Promise.all([
        getWeatherData(HORSENS_ROUTE),
        getWeatherData(AARHUS_ROUTE),
        getWeatherData(COPENHAGEN_ROUTE),
    ]);
};

const weatherData = await getWeatherForAllCities();


weatherData.forEach(element => {
    const latestMeasurement = model(element).latestMeasurements

    latestMeasurement.forEach(latestElement => {
        resultsContainer.appendChild(constructCard(latestElement))
    });

});

const [horsensWeather, aarhusWeather, copenhagenWeather] =
    await getWeatherForAllCities();

console.log(MaxTemperature(model(horsensWeather).historicalMeasurements))

