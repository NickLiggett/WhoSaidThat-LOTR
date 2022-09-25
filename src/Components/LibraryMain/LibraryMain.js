import React, { useState, useEffect } from "react"
import "./LibraryMain.css"
import { Link } from "react-router-dom"
import { fetchQuotes } from "../../apiCalls"

const LibraryMain = ({ name, quotes, theCharacters }) => {

    const [quoteList, setQuotes] = useState(quotes)

        if (quotes) {
            var quotations = quotes.map(quote => <div className="quote" key={quote._id}>{quote.dialog}</div>)      
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
            {(name) ? <div className="library-main-header">
                <img src="../../gondor-tree.png"/>
                <h2 className="library-main-title">{name}</h2>
                <Link to="/game"><button className="play-button">Play</button></Link>
                </div> : <p>Big-Hitter Pics</p>}
            <div className="quote-wrapper">{quotations}</div>
        </div>
    ) : <div className="library-main"><h1>Click on a Character</h1><Link to="/game"><button className="play-button">Play</button></Link></div>
}

export default LibraryMain