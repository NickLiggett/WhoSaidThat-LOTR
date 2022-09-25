import React, { useState, useEffect } from "react"
import "./Library.css"
import { Route, Link } from "react-router-dom"
import CharacterList from "../CharacterList/CharacterList"
import LibraryMain from "../LibraryMain/LibraryMain"
import { fetchQuotes, fetchCharacters, fetchAllQuotes } from "../../apiCalls"

const Library = ({ characters }) => {

    const [name, setName] = useState('Aragorn II Elessar')
    const [quotes, setQuotes] = useState(null)
    const [theCharacters, setCharacters] = useState(null)
    
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
            setCharacters(charsWithLines)
            
        })
        .then(() => {
            if (theCharacters) {
                const theCharacter = theCharacters.find(char => char.name === name)
                fetchQuotes(theCharacter._id)
                .then(data => setQuotes(data.docs))
            }
          })
        })
      }, [])

    return (theCharacters) ? (
        <div className="library">
            <div className="library-body">
                <CharacterList characters={characters} setName={setName} setQuotes={setQuotes}/>
                <Route path="/library" render={({ match }) => <LibraryMain name={name} theCharacters={theCharacters} quotes={quotes}/>}/>
            </div>
            
        </div>
    ) : <div className="loading"><h1>Forging the Ring...</h1></div>
}

export default Library