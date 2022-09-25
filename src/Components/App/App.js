import './App.css';
import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import Game from "../Game/Game"
import Library from "../Library/Library"
import { fetchCharacters, fetchAllQuotes } from "../../apiCalls"
import { getCharactersWithLines } from "../../util.js"

export function App() {

  const [characters, setCharacters] = useState([])
  
  useEffect(() => {
    let chars
    fetchCharacters()
    .then(data => {
      chars = data.docs
    })
    .then(() => {
      fetchAllQuotes()
      .then(data => {
        setCharacters(getCharactersWithLines(chars, data))
      })
    })
  }, [])

  return (
    <main>
      <Route exact path="/showcase-project/" render={() => <HomePage />}/>
      <Route exact path="/game" render={() => <Game />}/>
      <Route path="/library" render={() => <Library characters={characters}/>}/>
    </main>
  );
}
