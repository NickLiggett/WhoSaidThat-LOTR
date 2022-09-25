
export const getCharactersWithLines = (chars, data) => {
  return chars.reduce((list, char) => {
    data.docs.forEach(doc => {
      if (char._id === doc.character) {
        list.push(char)
      }
    })
    return list
  }, [])
}