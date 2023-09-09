import { AARHUS_ROUTE, COPENHAGEN_ROUTE, HORSENS_ROUTE } from "./constants.js";
import { HttpClient } from "./scripts/HttpClient.js";
import { constructCard } from "./generateHtml/construct-card.js";

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

const latestHorsensWeather = horsensWeather[0];
const latestAarhusWeather = aarhusWeather[2];
const latestCopenhagenWeather = copenhagenWeather[3];

