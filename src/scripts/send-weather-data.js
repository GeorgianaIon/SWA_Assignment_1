import HttpClient from "./HttpClient.js"
import { capitalizeFirstLetter } from "./utils.js"
import { API_URI, API_ROUTE, MeasurementTypes } from "./constants.js"

const form = document.getElementById("data-input-form")
const statusOutput = document.getElementById("status-message")
const measurementTypeInput = document.getElementById("measurement-type-input")
const timeInput = document.getElementById("time-input")
const placeInput = document.getElementById("place-input")
const valueInput = document.getElementById("value-input")

const getAdditionalWeatherData = () => {
    let unit
    let additionalInput
    switch (measurementTypeInput.value) {
        case MeasurementTypes.temperature:
            unit = "C"
            break
        case MeasurementTypes.precipitation:
            unit = "mm"
            additionalInput = {
                "precipitation_type": document.getElementById("additional-input").value
            }
            break
        case MeasurementTypes.windSpeed:
            unit = "m/s"
            additionalInput = {
                "direction": document.getElementById("additional-input").value
            }
            break
        case MeasurementTypes.cloudCoverage:
            unit = "%"
            break
        default:
            throw new Exception(`Invalid measurement type: '${measurementTypeInput.value}'`)
    }

    return { unit, additionalInput }
}

const getInputData = () => {
    const additionalWeatherData = getAdditionalWeatherData()

    return {
        value: Number(valueInput.value),
        type: measurementTypeInput.value,
        unit: additionalWeatherData.unit,
        time: `${timeInput.value}:00.000Z`,
        place: placeInput.value,
        ...additionalWeatherData.additionalInput
    }
}

const removeAdditionalInputIfPresent = () => {
    const additionalInput = document.getElementById("additional-input-container")

    if (additionalInput) {
        additionalInput.remove()
    }
}

const resetForm = () => {
    form.reset()
    removeAdditionalInputIfPresent()
}

const sendWeatherData = async () => {
    const inputData = getInputData()
    const httpClient = HttpClient()

    try {
        await httpClient.postFetchAsync({ data: inputData, url: `${API_URI}/${API_ROUTE}` })
        // await httpClient.postXmlHttpRequest({data: inputData ,url:`${API_URI}/${API_ROUTE}` })
        statusOutput.classList.add("input-success")
        statusOutput.classList.remove("input-failure")
        statusOutput.innerText = "Weather data successfully added!"
        resetForm()
    }
    catch (ex) {
        statusOutput.innerText = ex
    }
}

const insertAdditionalInput = (values) => {
    const div = document.createElement("div")
    const label = document.createElement("label")
    const input = document.createElement("select")

    div.setAttribute("id", "additional-input-container")
    div.classList.add("form-container")
    div.appendChild(label)
    div.appendChild(input)

    label.setAttribute("for", "additional-input")

    input.setAttribute("id", "additional-input")

    form.insertBefore(div, form.children[form.childElementCount - 1])

    const option = input.appendChild(document.createElement("option"))
    option.setAttribute("value", "")

    switch (measurementTypeInput.value) {
        case MeasurementTypes.precipitation:
            option.innerHTML = "Select a precipitation"
            label.innerHTML = "Precipitation:"
            break
        case MeasurementTypes.windSpeed:
            option.innerHTML = "Select a wind direction"
            label.innerHTML = "Wind direction:"
            break
        default:
            throw new Exception("Unhandled measurement type")
    }

    for (let i = 0; i < values.length; i++) {
        const option = input.appendChild(document.createElement("option"))
        option.setAttribute("value", values[i])
        option.innerHTML = capitalizeFirstLetter(values[i])
    }
}

const isModelValid = () => {
    statusOutput.innerText = ""
    const errors = []

    if (!measurementTypeInput.value) {
        errors.push("Please specify a measurement type")
    }

    if (!timeInput.value) {
        errors.push("Please specify a time of day")
    }

    if (!placeInput.value) {
        errors.push("Please specify a city")
    }

    if (!valueInput.value) {
        errors.push("Please specify a value")
    }

    if (measurementTypeInput.value === MeasurementTypes.precipitation ||
        measurementTypeInput.value === MeasurementTypes.windSpeed) {
        const additionalInput = document.getElementById("additional-input")
        let errorMessage

        if (!additionalInput.value) {
            switch (measurementTypeInput.value) {
                case MeasurementTypes.precipitation:
                    errorMessage = "Please specify a precipitation type"
                    break
                case MeasurementTypes.windSpeed:
                    errorMessage = "Please specify a wind direction"
                    break
                default:
                    throw new Exception("Unhandled measurement type")
            }

            errors.push(errorMessage)
        }
    }

    if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            statusOutput.innerText += `${errors[i]}\n`
        }

        statusOutput.classList.add("input-failure")
        statusOutput.classList.remove("input-success")
        return false
    }

    return true
}

measurementTypeInput.addEventListener("change", e => {
    const measurement = e.target.value

    removeAdditionalInputIfPresent()

    if (measurement === MeasurementTypes.precipitation) {
        insertAdditionalInput(["hail", "rain", "sleet", "snow"])
    }
    else if (measurement === MeasurementTypes.windSpeed) {
        insertAdditionalInput(["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"])
    }
})

form.addEventListener("submit", e => {
    e.preventDefault()
    if (!isModelValid()) {
        return
    }

    sendWeatherData()
})
