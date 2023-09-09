const HttpClient = () => {
    const getWeatherData = async (route) => {
        const response = await fetch(route, {
            headers: {
                Accept: "application/json",
            },
        });
        const data = await response.json();
        return data;
    };
}

export default HttpClient;