import React from "react"
import { Link } from "react-router-dom"
import "./Favorites.css"

export const Favorites = ({ favoriteQuotes, characters }) => {

    const favoritesList = favoriteQuotes.map(quote => {
        const quotee = characters.find(char => char._id === quote.character)
        console.log(quotee)
        return (
            <div className="favorite-quote">
                <p className="quote">{quote.dialog}</p>
                <h3 className="quotee">-{quotee.name}</h3>
            </div>
        )
    })

    return (
        <div className="favorites">
            <div className="favorites-header">
                <Link to="/WhoSaidThat-LOTR/game"><button className="play-button">Play</button></Link>
                <h1>Here are your favotire quotes!</h1>
                <Link to="/WhoSaidThat-LOTR/library"><button className="study-hall-button">Study Hall</button></Link>
            </div>
            <div>{favoritesList}</div>
        </div>
    )
}