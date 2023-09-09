import { WEATHER_TYPES } from "./constants"

function DataMeasurement(type, time, place, unit) {
    return { 
        getType: () => type, 
        getTime: () => time, 
        getPlace: () => place, 
        getUnit: () => unit
    }
}

function HistoricalMeasurement({type, time, place, unit, value}) {
    const dataMeasurement = DataMeasurement(type, time, place, unit)
    return {
        ... dataMeasurement,
        getValue: () => value
    }
}

function ForecastMeasurement({type, time, place, value, unit, from, to, precipitation_types, directions}) {
    const measurement = HistoricalMeasurement(type, time, place, unit, value)
    return {
        ...measurement,
        getFrom: ()=> from, 
        getTo: () => to,
        getPrecipitationTypes: () => precipitation_types,
        getDirections: () => directions
    }
}

const model = (weatherData) => {
    const historicalMeasurements = weatherData.map(data => HistoricalMeasurement(data.type, data.time, data.place, data.unit, data.value))

    const forecastMeasurements = weatherData.map(data => ForecastMeasurement(data.type, data.time, data.place, data.value, data.unit, data.from,
         data.to, data.precipitation_types, data.directions))

    const latestMeasurements = () => {
        let latMeasurements = []
        let histMeasurements = weatherData.map(data => HistoricalMeasurement(data.type, data.time, data.place, data.unit, data.value))
        let types = WEATHER_TYPES
        for(let j = 0; j < types.length; j++) {
            for(let i = histMeasurements.length -1; i >= 0; i--) {
                if(histMeasurements[i].getType === types[j]) {
                    latMeasurements.push(histMeasurements[i])
                    break
                }  
            }
        }
        return latMeasurements
    }
    return {
        historicalMeasurements, forecastMeasurements, latestMeasurements
    }
}
export default model

export function MinTemperature(weatherData) {
    let min = weatherData[0].getValue()
    let lastDay = FindLastDay()
    for(let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].getType() === WEATHER_TYPES[0] && weatherData[i].getTime() === lastDay) {
            min = Math.min(min, weatherData[i].getValue())
        }
    }
    return min
}

export function MaxTemperature(weatherData) {
    let max = weatherData[0].getValue()
    let lastDay = FindLastDay()
    for(let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].getType === WEATHER_TYPES[0] && weatherData[i].getTime() === lastDay) {
            max = Math.max(max, weatherData[i].getValue())
        }
    }
    return max
}

export function TotalPrecipitation(weatherData) {
    let totalPrecipitation = 0
    let lastDay = FindLastDay()
    for(let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].getType === WEATHER_TYPES[1] && weatherData[i].getTime() === lastDay){
            totalPrecipitation += weatherData[i].getValue()
        }
    }
    return Math.round(totalPrecipitation * 100) / 100
}

export function AverageWindSpeed(weatherData) {
    let sum = 0
    let count = 0
    let lastDay = FindLastDay()
    for(let i = 0; i < weatherData.length; i++) {
        if(weatherData[i].getType === WEATHER_TYPES[3] && weatherData[i].getTime() === lastDay) {
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