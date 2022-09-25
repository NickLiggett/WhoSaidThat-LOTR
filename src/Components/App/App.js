import './App.css';
import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
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
      <Switch>
        <Route exact path="/WhoSaidThat-LOTR/" render={() => <HomePage />}/>
        <Route exact path="/WhoSaidThat-LOTR/game" render={() => <Game />}/>
        <Route exact path="/WhoSaidThat-LOTR/library" render={() => <Library characters={characters}/>}/>
      </Switch>
    </main>
  );
}
