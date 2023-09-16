import { icons } from "../scripts/constants.js";

export function constructCard({ weatherData, type, text, value }) {
  const div = document.createElement("div");
  div.classList.add("weather-card");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let iconType, title, valueText;

  iconType = weatherData ? weatherData.getType() : type;
  title = weatherData ? capitalizeFirstLetter(weatherData.getType()) : text;
  valueText = weatherData ? `${weatherData.getValue()} ${weatherData.getUnit()}` : value;

  const cardIcon = icons[iconType];

  const htmlString = `
    <h2>${title}</h2>
    <img src='../icons/${cardIcon}' class="weather-icon"></img>
    <h2>${valueText}</h2>
  `;

  div.innerHTML = htmlString;

  return div;
}
