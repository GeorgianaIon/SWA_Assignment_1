import HttpClient from "./HttpClient.js"

const dataInputContainer = document.getElementById("data-input-container")
const sendBtn = document.getElementById("send-btn")
const statusOutput = document.getElementById("status-message")
const measurementTypeSelection = document.getElementById("measurement-type-selection")
const timeInput = document.getElementById("time-input")
const placeInput = document.getElementById("place-input")
const valueInput = document.getElementById("value-input")

const sendWeatherData = async () => {
    let unit
    switch (measurementTypeSelection.value) {
        case "temperature":
            unit = "C"
            break
        case "precipitation":
            unit = "mm"
            break
        case "wind speed":
            unit = "m/s"
            break
        case "cloud coverage":
            unit = "%"
            break
        default:
            statusOutput.innerText = `Invalid measurement type: '${measurementTypeSelection.value}'`
            return
    }

    // <!-- conditional rendering, if type is windspeed, add direction
    // if type is temperature, default to unit C -->
    
    const inputData = {
        value: Number(valueInput.value),
        type: measurementTypeSelection.value,
        unit: unit,
        time: `${timeInput.value}:00.000Z`,
        place: placeInput.value,
    }

    const headers = {
        "Content-Type": "application/json", 
        Accept: "application/json"
    }

    const httpClient = HttpClient()

    try {
        await httpClient.postFetchAsync(headers, inputData, `http://localhost:8080/data`)
        statusOutput.innerText = "Weather data successfully added!"
    }
    catch (ex) {
        statusOutput.innerText = ex
    }
}

const insertDirectionInput = () => {
    const input = dataInputContainer.appendChild(document.createElement("input"))
    input.setAttribute("id", "wind-direction-input")
    input.setAttribute("type", "text")
}

measurementTypeSelection.addEventListener("change", e => {
    const measurement = e.target.value


    
    if (measurement === "precipitation") {

    }
    else if (measurement === "wind speed") {
        insertDirectionInput()
    }
})

sendBtn.addEventListener("click", e => {
    sendWeatherData()
})
