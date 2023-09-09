import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import HttpClient from "./scripts/HttpClient.js";
import { constructCard } from "./generateHtml/construct-card.js";
import model from "./model.js"

const { getWeatherData } = HttpClient();

const getWeatherForAllCities = async () => {
    return await Promise.all([
        getWeatherData(HORSENS_ROUTE),
        getWeatherData(AARHUS_ROUTE),
        getWeatherData(COPENHAGEN_ROUTE),
    ]);
};

const [horsensWeather, aarhusWeather, copenhagenWeather] =
    await getWeatherForAllCities();

console.log(model(horsensWeather).latestMeasurements[0].getType())

const latestHorsensWeather = horsensWeather[0];
const latestAarhusWeather = aarhusWeather[2];
const latestCopenhagenWeather = copenhagenWeather[3];

const resultsContainer = document.getElementsByClassName("weather-data")[0];

const horsensCard = constructCard(latestHorsensWeather);
const aarhusCard = constructCard(latestAarhusWeather);
const copenhagenCard = constructCard(latestCopenhagenWeather);

resultsContainer.appendChild(horsensCard);
resultsContainer.appendChild(aarhusCard);
resultsContainer.appendChild(copenhagenCard);

