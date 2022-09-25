export const fetchCharacters = () => {
    return fetch("https://the-one-api.dev/v2/character", {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
        }
        })
        .then(response => response.json())
}

export const fetchQuotes = (id) => {
    return fetch(`https://the-one-api.dev/v2/character/${id}/quote`, {
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
          }
          })
          .then(response => response.json())
}

export const fetchAllQuotes = () => {
    return fetch("https://the-one-api.dev/v2/quote", {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
      }
      })
      .then(response => response.json())
}

// combine fetches into one function