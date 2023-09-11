import { WEATHER_TYPES } from "./constants.js"

function DataMeasurement(type, time, place, unit) {
    return {
        getType: () => type,
        getTime: () => time,
        getPlace: () => place,
        getUnit: () => unit
    }
}

function HistoricalMeasurement(type, time, place, unit, value) {
    const dataMeasurement = DataMeasurement(type, time, place, unit)
    return {
        ...dataMeasurement,
        getValue: () => value
    }
}

function ForecastMeasurement({ type, time, place, value, unit, from, to, precipitation_types, directions }) {
    const measurement = HistoricalMeasurement(type, time, place, unit, value)
    return {
        ...measurement,
        getFrom: () => from,
        getTo: () => to,
        getPrecipitationTypes: () => precipitation_types,
        getDirections: () => directions
    }
}

const model = (weatherData) => {
    const historicalMeasurements = weatherData.map(data => HistoricalMeasurement(data.type, data.time, data.place, data.unit, data.value))

    const forecastMeasurements = weatherData.map(data => ForecastMeasurement({
        type: data.type, time: data.time, place: data.place, value: data.value, unit: data.unit, from: data.from,
        to: data.to, precipitation_types: data.precipitation_types, directions: data.directions
    }))

    const latestMeasurements = LatestMeasurements(historicalMeasurements)
    const minTemperature = MinTemperature(weatherData)
    const maxTemperature = MaxTemperature(weatherData)
    const totalPrecipitation = TotalPrecipitation(weatherData)
    const avgWindSpeed = AverageWindSpeed(weatherData)

    return {
        historicalMeasurements, forecastMeasurements, latestMeasurements,
        minTemperature, maxTemperature, totalPrecipitation, avgWindSpeed
    }
}
export default model

function LatestMeasurements(historicalMeasurements) {
    let latestMeasurements = []
    let types = WEATHER_TYPES

    for (let j = 0; j < types.length; j++) {
        for (let i = historicalMeasurements.length - 1; i >= 0; i--) {
            if (historicalMeasurements[i].getType() === types[j]) {
                latestMeasurements.push(historicalMeasurements[i])
                break
            }
        }
    }
    return latestMeasurements
}

function MinTemperature(weatherData) {
    let min = weatherData[0].value
    let lastDay = FindLastDay(weatherData)
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].type === WEATHER_TYPES[0] && weatherData[i].time === lastDay) {
            min = Math.min(min, weatherData[i].value)
        }
    }
    return min
}

function MaxTemperature(weatherData) {
    let max = weatherData[0].value
    let lastDay = FindLastDay(weatherData)
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].type === WEATHER_TYPES[0] && weatherData.time === lastDay) {
            max = Math.max(max, weatherData[i].value)
        }
    }
    return max
}

function TotalPrecipitation(weatherData) {
    let totalPrecipitation = 0
    let lastDay = FindLastDay(weatherData)
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].type === WEATHER_TYPES[1] && weatherData[i].time === lastDay) {
            totalPrecipitation += weatherData[i].value
        }
    }
    return Math.round(totalPrecipitation * 100) / 100
}

function AverageWindSpeed(weatherData) {
    let sum = 0
    let count = 0
    let lastDay = FindLastDay(weatherData)
    for (let i = 0; i < weatherData.length; i++) {
        if (weatherData[i].type === WEATHER_TYPES[3] && weatherData[i].time === lastDay) {
            sum += weatherData[i].value
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
        if (!lastDay || weatherData[i].time > lastDay) {
            lastDay = weatherData[i].time
        }
    }
    return lastDay
}