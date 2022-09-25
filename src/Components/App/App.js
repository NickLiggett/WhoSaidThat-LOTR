import './App.css';
import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import Game from "../Game/Game"
import Library from "../Library/Library"
import { ErrorPage } from "../ErrorPage/ErrorPage"
import { Favorites } from "../Favorites/Favorites"
import { fetchCharacters, fetchAllQuotes } from "../../apiCalls"
import { getCharactersWithLines } from "../../util.js"

export function App() {

  const [characters, setCharacters] = useState([])
  const [favoriteQuotes, setFavoriteQuotes] = useState([])
  
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

  const addToFavorites = (quote) => {
    setFavoriteQuotes([...favoriteQuotes, quote])
  }

  return (
    <main>
      <Switch>
        <Route exact path="/WhoSaidThat-LOTR/" render={() => <HomePage />}/>
        <Route exact path="/WhoSaidThat-LOTR/game" render={() => <Game />}/>
        <Route exact path="/WhoSaidThat-LOTR/library" render={() => <Library characters={characters} addToFavorites={addToFavorites}/>}/>
        <Route exact path="/WhoSaidThat-LOTR/favorites" render={() => <Favorites favoriteQuotes={favoriteQuotes} characters={characters}/>}/> 
        <Route exact path="/WhoSaidThat-LOTR/*" render={() => <ErrorPage />}/>      
      </Switch>
    </main>
  );
}
