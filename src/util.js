import { fetchCharacters, fetchAllQuotes } from "./apiCalls"

export const getCharactersWithLines = () => {
    let chars
    let charactersWithLines
    return fetchCharacters()
    .then(data => {
      chars = data.docs
    })
    .then(() => {
      fetchAllQuotes()
      .then(data => {
        charactersWithLines = chars.reduce((list, char) => {
          data.docs.forEach(doc => {
            if (char._id === doc.character) {
              list.push(char)
            }
          })
          return list
        }, [])
        // setCharacters(charsWithLines)
      })
    })
}