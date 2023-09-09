import { icons } from "../constants.js";

export function constructCard(weatherData) {
  const div = document.createElement("div");
  div.classList.add("weather-card");

  const cardIcon = icons[weatherData.type];

  const htmlString = `
    <h1>${weatherData.place}</h1>
    <p>${weatherData.type} is at</p>
    <img src='../icons/${cardIcon}' class="weather-icon"></img>
    <h2>${weatherData.value} ${weatherData.unit}</h2>
  `;

  div.innerHTML = htmlString;

  return div;
}
