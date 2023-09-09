import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./HttpClient.js";
import { constructCard } from "../generateHtml/construct-card.js";
import model from "./model.js"
import { MinTemperature, MaxTemperature, AverageWindSpeed, TotalPrecipitation } from "./model.js"

const { getFetchAsync } = HttpClient();
const resultsContainer = document.getElementsByClassName("weather-data")[0];


const getWeatherForAllCities = async () => {
    return await Promise.all([
        getFetchAsync(HORSENS_ROUTE),
        getFetchAsync(AARHUS_ROUTE),
        getFetchAsync(COPENHAGEN_ROUTE),
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

