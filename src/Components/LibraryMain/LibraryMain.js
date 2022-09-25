import React, { useState, useEffect } from "react"
import "./LibraryMain.css"
import { Link } from "react-router-dom"
import { fetchQuotes } from "../../apiCalls"

const LibraryMain = ({ name, quotes, theCharacters, addToFavorites }) => {

    const [quoteList, setQuotes] = useState(quotes)

        if (quotes) {
            var quotations = quotes.map(quote => <div className="quote" key={quote._id} onClick={() => addToFavorites(quote)}>{quote.dialog}</div>)      
        }

        useEffect(() => {
            if (!quoteList) {
                let character = theCharacters.find(char => char.name === name)
                fetchQuotes(character._id)
                .then(data => setQuotes(data.docs))
            }
        })
    
    return (quotes) ? (
        <div className="library-main">
            {(name) && <div className="library-main-header">
                <Link to="/WhoSaidThat-LOTR/favorites" className="favorites-link"><button className="favorites-button">Favorites</button></Link>
                <h2 className="library-main-title">{name}</h2>
                <Link to="/WhoSaidThat-LOTR/game" className="play-game-link"><button className="play-button">Play</button></Link>
                </div>}
            <div className="quote-wrapper">{quotations}</div>
        </div>
    ) : <div className="library-main">
            <h1>Click on a Character</h1>
            <div className="button-wrapper">
            <Link to="/WhoSaidThat-LOTR/game" className="play-game-link">
                <button className="play-button">Play</button>
            </Link>
            <Link to="/WhoSaidThat-LOTR/favorites" className="favorites-link">
                <button className="favorites-button">Favorites</button>
            </Link>
            </div>
        </div>
}

export default LibraryMain