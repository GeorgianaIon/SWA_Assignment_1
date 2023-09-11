import { weatherDetailsIcons, weatherDetails } from "../scripts/constants.js"

export function weatherDetailsCard(icon, detailType) {
    const div = document.createElement('div')
    div.classList.add("weather-details-card")

    div.innerHTML = `
    <h2 class="title">${weatherDetails[icon]}</h2>
    <img src='../icons/${weatherDetailsIcons[icon]}' class="weather-icon"></img>
    <h2>${detailType}</h2>
    `
    return div
}