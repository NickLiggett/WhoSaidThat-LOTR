import React, { useState, useEffect } from "react"
import "./CharacterList.css"
import { Link } from "react-router-dom"
import { fetchQuotes } from "../../apiCalls"

const CharacterList = ({ characters, setName, setQuotes }) => {

    const quoteHandler = (char) => {
        setName(char.name)
        fetchQuotes(char._id)
        .then(data => setQuotes(data.docs))
    }

    const noDupes = characters.reduce((list, char) => {
        if (!list.includes(char)) {
            list.push(char)
        }
        return list
    }, [])

    const charList = noDupes.map(char => {
        return (
            <Link to="/library"  key={char._id}>
                <button id={char.name} className="character-name" onClick={() => quoteHandler(char)}>
                    {char.name}
                </button>
            </Link>
        )
    })

    return (
        <div className="character-list">
            {charList}
        </div>
    )
}

export default CharacterList