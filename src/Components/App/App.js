import './App.css';
import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import Game from "../Game/Game"
import Library from "../Library/Library"
import { fetchCharacters, fetchAllQuotes } from "../../apiCalls"
import { getCharactersWithLines } from "../../util.js"

console.log(getCharactersWithLines())

export function App() {

  const [characters, setCharacters] = useState([])
  
  const stateSetter = (data) => {
    setCharacters(data)
  }
  
  useEffect(() => {
    let chars
    fetchCharacters()
    .then(data => {
      chars = data.docs
    })
    .then(() => {
      fetchAllQuotes()
      .then(data => {
        let charsWithLines = chars.reduce((list, char) => {
          data.docs.forEach(doc => {
            if (char._id === doc.character) {
              list.push(char)
            }
          })
          return list
        }, [])
        stateSetter(charsWithLines)
      })
    })
  }, [])

  return (
    <main>
      <Route exact path="/" render={() => <HomePage />}/>
      <Route exact path="/game" render={() => <Game />}/>
      <Route path="/library" render={() => <Library characters={characters}/>}/>
    </main>
  );
}
