import React from "react"
import "./HomePage.css"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="homepage">
            <h1 className="main-title">Who Said That?</h1>
            <h2>The Lord of The Rings</h2>
            <div className="homepage-buttons">
                <Link to="/WhoSaidThat-LOTR/game" id="play-game-button"><button className="homepage-button" id="play-game-button">Play</button></Link>
                <Link to="/WhoSaidThat-LOTR/library" id="study-hall-button"><button className="homepage-button" id="study-hall-button">Study</button></Link>
            </div>
        </div>
    )
}

export default HomePage