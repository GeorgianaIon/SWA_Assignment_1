import { icons } from "../constants.js";

export function constructCard(weatherData) {
  const div = document.createElement("div");
  div.classList.add("weather-card");

  const cardIcon = icons[weatherData.getType()];

  const htmlString = `
    <h1>${weatherData.getPlace()}</h1>
    <p>${weatherData.getType()} is at</p>
    <img src='../icons/${cardIcon}' class="weather-icon"></img>
    <h2>${weatherData.getValue()} ${weatherData.getUnit()}</h2>
  `;

  div.innerHTML = htmlString;

  return div;
}
