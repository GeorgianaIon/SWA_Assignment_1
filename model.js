import { WEATHER_TYPES } from "./constants.js"

function DataMeasurement(type, time, place, unit) {
    return {
        getType: () => type,
        getTime: () => time,
        getPlace: () => place,
        getUnit: () => unit
    }
}

function HistoricalMeasurement({ type, time, place, unit, value }) {
    const dataMeasurement = DataMeasurement(type, time, place, unit)
    return {
        ...dataMeasurement,
        getValue: () => value
    }
}

function ForecastMeasurement({ type, time, place, value, unit, from, to, precipitation_types, directions }) {
    const measurement = HistoricalMeasurement({ type: type, time: time, place: place, unit: unit, value: value })
    return {
        ...measurement,
        getFrom: () => from,
        getTo: () => to,
        getPrecipitationTypes: () => precipitation_types,
        getDirections: () => directions
    }
}

const model = (weatherData) => {
    const historicalMeasurements = weatherData.map(data => HistoricalMeasurement({ type: data.type, time: data.time, place: data.place, unit: data.unit, value: data.value }))

    const forecastMeasurements = weatherData.map(data => ForecastMeasurement({
        type: data.type, time: data.time, place: data.place, value: data.value, unit: data.unit, from: data.from,
        to: data.to, precipitation_types: data.precipitation_types, directions: data.directions
    }))

    let latestMeasurements = [];
    let types = WEATHER_TYPES;

    for (let j = 0; j < types.length; j++) {
        for (let i = historicalMeasurements.length - 1; i >= 0; i--) {
            if (historicalMeasurements[i].getType() === types[j]) {
                latestMeasurements.push(historicalMeasurements[i]);
                break;
            }
        }
    }
    return {
        historicalMeasurements, forecastMeasurements, latestMeasurements
    }
}
export default model

export function MinTemperature(weatherData) {
    let min = weatherData[0].getValue()
    let lastDay = FindLastDay()
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].getType() === WEATHER_TYPES[0] && weatherData[i].getTime() === lastDay) {
            min = Math.min(min, weatherData[i].getValue())
        }
    }
    return min
}

export function MaxTemperature(weatherData) {
    let max = weatherData[0].getValue()
    let lastDay = FindLastDay()
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].getType === WEATHER_TYPES[0] && weatherData[i].getTime() === lastDay) {
            max = Math.max(max, weatherData[i].getValue())
        }
    }
    return max
}

export function TotalPrecipitation(weatherData) {
    let totalPrecipitation = 0
    let lastDay = FindLastDay()
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].getType === WEATHER_TYPES[1] && weatherData[i].getTime() === lastDay) {
            totalPrecipitation += weatherData[i].getValue()
        }
    }
    return Math.round(totalPrecipitation * 100) / 100
}

export function AverageWindSpeed(weatherData) {
    let sum = 0
    let count = 0
    let lastDay = FindLastDay()
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].getType === WEATHER_TYPES[3] && weatherData[i].getTime() === lastDay) {
            sum += weatherData[i].getValue()
            count++
        }
    }

    if (count === 0) {
        return 0
    } else {
        return sum / count
    }
}

function FindLastDay(weatherData) {
    let lastDay = null
    for (let i = 0; i < weatherData.length; i++) {
        if (!lastDay || weatherData[i].getTime() > lastDay) {
            lastDay = weatherData[i].getTime()
        }
    }
    return lastDay
}