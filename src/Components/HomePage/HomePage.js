import React from "react"
import "./HomePage.css"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Who Said That?</h1>
            <h2>The Lord of The Rings</h2>
            <div className="homepage-buttons">
                <Link to="/game"><button>Play</button></Link>
                <Link to="/library"><button>Study</button></Link>
            </div>
        </div>
    )
}

export default HomePage