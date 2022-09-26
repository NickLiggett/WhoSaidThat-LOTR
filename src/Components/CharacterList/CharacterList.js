import React, { useState, useEffect } from "react"
import "./CharacterList.css"
import { Link } from "react-router-dom"
import { fetchCall } from "../../apiCalls"

const CharacterList = ({ characters, setName, setQuotes }) => {

    const quoteHandler = (char) => {
        setName(char.name)
        fetchCall(`character/${char._id}/quote`)
        .then(data => setQuotes(data.docs))
    }

    const noDupes = characters.reduce((list, char) => {
        if (!list.includes(char)) {
            list.push(char)
        }
        return list
    }, []).sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))

    const charList = noDupes.map(char => {
        return (
            <Link to="/WhoSaidThat-LOTR/library"  key={char._id} id={char.name}>
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