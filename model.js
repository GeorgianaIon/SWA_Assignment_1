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
    return {...measurement,
        getFrom: ()=> from, 
        getTo: () => to,
        getPrecipitationTypes: () => precipitation_types,
        getDirections: () => directions
    }
}