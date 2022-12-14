import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./Library.css"
import { Route, Link } from "react-router-dom"
import { CharacterList } from "../CharacterList/CharacterList"
import { LibraryMain } from "../LibraryMain/LibraryMain"
import { fetchCall } from "../../apiCalls"
import { getCharactersWithLines } from "../../util.js"


export const Library = ({ characters, addToFavorites, favoriteQuotes }) => {

    const [name, setName] = useState('Aragorn II Elessar')
    const [quotes, setQuotes] = useState(null)
    const [theCharacters, setCharacters] = useState(null)
    
    useEffect(() => {
        let chars
        fetchCall('character')
        .then(data => {
          chars = data.docs
        })
        .then(() => {
          fetchCall('quote')
          .then(data => {
            setCharacters(getCharactersWithLines(chars, data)) 
        })
        })
      }, [])

    return (theCharacters) ? (
        <div className="library">
            <div className="library-body">
                <CharacterList characters={characters} setName={setName} setQuotes={setQuotes}/>
                <Route path="/WhoSaidThat-LOTR/library" render={() => <LibraryMain name={name} theCharacters={theCharacters} quotes={quotes} addToFavorites={addToFavorites} favoriteQuotes={favoriteQuotes}/>}/>
            </div>
            
        </div>
    ) : <div className="loading"><h1>Forging the Ring...</h1></div>
}

Library.propTypes = {
  characters: PropTypes.array.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  favoriteQuotes: PropTypes.array.isRequired
}