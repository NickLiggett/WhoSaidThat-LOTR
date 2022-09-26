import React, { useState, useEffect } from "react"
import "./Game.css"
import { Link } from "react-router-dom"
import { fetchCall } from "../../apiCalls"
import { getCharactersWithLines } from "../../util.js"

export const Game = () => {
    
    const [characters, setCharacters] = useState(null)   
    const [quotes, setQuotes] = useState(null)
    const [theQuote, setTheQuote] = useState(null)
    const [choices, setChoices] = useState(null)
    const [correctAnswer, setAnswer] = useState(null)
    const [reply, setReply] = useState('')
    const [answered, setAnswered] = useState(false)
    
    const handleGuess = (event) => {
        setAnswered(true)
        if (event.target.id === correctAnswer) {
            setReply("CORRECT!")
        } else {
            setReply("Maybe next time...")
        }
        let chars
        fetchCall('character')
        .then(data => {
            chars = data.docs
        })
        .then(() => {
            fetchCall('quote')
            .then(data => {
                setQuotes(data.docs)
                setupGame(data.docs, getCharactersWithLines(chars, data))
                setCharacters(getCharactersWithLines(chars, data))
            })
        })
        setTimeout(() => {
        setAnswered(false)
    }, 1500);
    }
    
    const setupGame = (quotes, chars) => {

        let quote = quotes[Math.floor(Math.random() * quotes.length)]
        setTheQuote(quote)

        let correctAnswer = chars.find(char => char._id === quote.character)
        setAnswer(correctAnswer.name)

        let threeWrongChoices = []
        let randomChoice = () => {
            let randomName = chars[Math.floor(Math.random() * chars.length)].name
            if (threeWrongChoices.includes(randomName) === false && 
                randomName !== correctAnswer.name) {
            threeWrongChoices.push(randomName)
            }
        }

        while (threeWrongChoices.length < 3) {
        randomChoice()
        }

        setChoices([correctAnswer.name, ...threeWrongChoices ])
    }

    useEffect(() => {
        let chars
        fetchCall('character')
        .then(data => {
          chars = data.docs
        })
        .then(() => {
          fetchCall('quote')
          .then(data => {
            setQuotes(data.docs)
            setupGame(data.docs, getCharactersWithLines(chars, data))
            setCharacters(getCharactersWithLines(chars, data))
          })
        })
      }, [])

      if (choices) {
            var options = choices.sort().map(choice => {
                return <button
                        className="choice-button"
                        key={choice} 
                        id={choice}
                        onClick={(event) => handleGuess(event)}>
                            {choice}
                        </button>
            })
        }

    return (characters && quotes && choices) ? (
        (!answered) ? <div className="game">
            <h3 className="quote-question">{theQuote.dialog}</h3>
            <h3 className="title">Who said that?</h3>
            <div className="choices">
                {options}
            </div>
            <Link to="/WhoSaidThat-LOTR/library" className="study-hall-link"><button className="study-hall-button">Study Hall</button></Link>
        </div> : <div className="game"><h1 className="reply">{reply}</h1></div>
    ) : <div className="game"><h1 className="loading">Forging the ring...</h1></div>
}