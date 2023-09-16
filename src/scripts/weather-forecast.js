import { AARHUS_ROUTE_FORECAST, COPENHAGEN_ROUTE_FORECAST, HORSENS_ROUTE_FORECAST, Cities } from "./constants.js";
import HttpClient from "./HttpClient.js";
import model from "./model.js"

const { getFetchAsync } = HttpClient();
const selectCity = document.getElementById("city-select")
const tableBody = document.getElementById("table-forecast")

const getForcastForAllCities = async () => 
{
    return await Promise.all([
        getFetchAsync(HORSENS_ROUTE_FORECAST),
        getFetchAsync(AARHUS_ROUTE_FORECAST),
        getFetchAsync(COPENHAGEN_ROUTE_FORECAST)
    ]);
};

selectCity.addEventListener('change', () => 
{
    const selectedCity = selectCity.value
    displayWeatherForecast(selectedCity)
});

//weather data for each city
const [horsensForecast, aarhusForecast, copenhagenForecast] =
    await getForcastForAllCities()

const displayWeatherForecast = (selectedCity) => 
{
    refreshTable();
    const forecast = getSelectedForecast(selectedCity)    

    for (let i = 0; i < forecast.length; i++) {
        const tr = document.createElement("tr")
        tr.classList.add("forecast-data")

        if (i % 4 == 0) {
            const tdTime = document.createElement("td")
            tdTime.setAttribute("rowspan", 4)
            tdTime.innerHTML = new Date(forecast[i].getTime()).toLocaleString()
            tr.appendChild(tdTime)
        }

        const tdType = document.createElement("td")
        tdType.innerHTML = forecast[i].getType();
        tr.appendChild(tdType)

        const tdFrom = document.createElement("td")
        tdFrom.innerHTML = forecast[i].getFrom() + forecast[i].getUnit()
        tr.appendChild(tdFrom)

        const tdTo = document.createElement("td")
        tdTo.innerHTML = forecast[i].getTo() + forecast[i].getUnit()
        tr.appendChild(tdTo)

        const tdPrecipitationTypes = document.createElement("td")
        if (forecast[i].getPrecipitationTypes()) 
        {
            tdPrecipitationTypes.innerHTML = forecast[i].getPrecipitationTypes().join(', ')
        }
        tr.appendChild(tdPrecipitationTypes)

        const tdWindDirections = document.createElement("td")
        if (forecast[i].getDirections()) 
        {
            tdWindDirections.innerHTML = forecast[i].getDirections().join(', ')
        }
        tr.appendChild(tdWindDirections)
        tableBody.appendChild(tr)
    }
}

const refreshTable = () =>
{
    const dataRows = Array.from(document.getElementsByClassName("forecast-data"))
    dataRows.forEach(row => row.remove())
}

const getSelectedForecast = (selectedCity) => 
{
    switch (selectedCity) {
        case Cities.Horsens:
            return model(horsensForecast).forecastMeasurements
        case Cities.Aarhus:
            return model(aarhusForecast).forecastMeasurements
        case Cities.Copenhagen:
            return model(copenhagenForecast).forecastMeasurements
        default:
            return [];
    }
};

displayWeatherForecast('Horsens')