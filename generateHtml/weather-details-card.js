export function weatherDetailsCard(selectedCity, detailType) {
    const div = document.createElement('div')
    div.classList.add("weather-details-card")

    div.textContent = `${selectedCity}: ${detailType}`

    return div
}