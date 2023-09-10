export function customCardIcon({ type }) {
  switch (type) {
    case "temperature":
      return "temperature.png";
    case "precipitation":
      return "precipitation.png";
    case "wind speed":
      return "wind.png";
    case "cloud coverage":
      return "cloud-coverage.png";
  }
}

export function customWeatherCardIcon(type) {
  switch(type) {
    case "maxtemperature" : "maxtemperature.png"
    case "mintemperature" : "mintemperature.png"
    case "precipitation" : "precipitation.png"
    case "wind" : "wind.png"
  }
}
