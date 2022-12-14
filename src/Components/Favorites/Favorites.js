import React from "react"
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom"
import "./Favorites.css"

export const Favorites = ({ favoriteQuotes, characters, unFavorite }) => {

    const favoritesList = favoriteQuotes.map(quote => {
        const quotee = characters.find(char => char._id === quote.character)
        return (
            <div className="favorite-quote" key={quote._id} onClick={() => unFavorite(quote)}>
                <p className="quote-dialog">{quote.dialog}</p>
                <h3 className="quotee">- {quotee.name}</h3>
            </div>
        )
    })

    return (
        <div className="favorites">
            <div className="favorites-header">
                <Link to="/WhoSaidThat-LOTR/game"><button className="play-button">Play</button></Link>
                <div className="favorite-title">
                    <h1>Here are your favorite quotes!</h1>
                    <p>* Click a quote to unfavorite it.</p>
                </div>
                <Link to="/WhoSaidThat-LOTR/library"><button className="study-hall-button">Study Hall</button></Link>
            </div>
            <div>{favoritesList}</div>
        </div>
    )
}

Favorites.propTypes = {
    favoriteQuotes: PropTypes.array.isRequired,
    characters: PropTypes.array.isRequired,
    unFavorite: PropTypes.func.isRequired
}