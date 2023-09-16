const HttpClient = () => {
    const getFetchAsync = async (url) => {
        const headers = { Accept: "application/json" }
        const response = await fetch(url, { headers })

        if (!response.ok) {
            throw new Exception(response.status)
        }

        return response.json()
    }

    const postFetchAsync = async ({ headers, data, url }) => {
        headers ??= { "Content-Type": "application/json", Accept: "application/json" }
        const json = JSON.stringify(data)
        const response = await fetch(url, { headers, method: "POST", body: json })

        if (!response.ok) {
            throw new Exception(response.status)
        }

        return response.json()
    }

    const getXmlHttpRequest = (url) => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.setRequestHeader("Accept", "application/json");
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    const response = request.responseText;
                    const data = JSON.parse(response);
                    resolve(data);
                } else {
                    reject(new Error(request.statusText));
                }
            };
            request.onerror = () => {
                reject(new Error(request.statusText));
            };
            request.send();
        });
    };


    const postXmlHttpRequest = ({ headers, data, url, callback }) => {
        if (!headers) {
            request.setRequestHeader("Accept", "application/json")
            request.setRequestHeader("Content-Type", "application/json")
        }
        else {
            for (const property in headers) {
                request.setRequestHeader(property, headers[property])
            }
        }

        const request = new XMLHttpRequest()
        request.open("POST", url)
        request.onload = () => {
            const response = request.responseText
            const data = JSON.parse(response)
            callback(data)
        }
        request.onerror = () => {
            throw new Exception(request.responseText)
        }
        request.send(JSON.stringify(data))
    }

    return { getFetchAsync, postFetchAsync, getXmlHttpRequest, postXmlHttpRequest }
}

export default HttpClient;