export const fetchCall = (endpoint) => {
    return fetch(`https://the-one-api.dev/v2/${endpoint}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
        }
        })
        .then(response => response.json())
}