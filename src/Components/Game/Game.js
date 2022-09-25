import React, { useState, useEffect } from "react"
import "./Game.css"
import { Link } from "react-router-dom"
import { fetchAllQuotes, fetchCharacters } from "../../apiCalls"

const Game = () => {
    
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
        let chars           // <---- start of function import from util.js
        fetchCharacters()
        .then(data => {
            chars = data.docs
        })
        .then(() => {
            fetchAllQuotes()
            .then(data => {
                setQuotes(data.docs)
                let charsWithLines = chars.reduce((list, char) => {
                    data.docs.forEach(doc => {
                        if (char._id === doc.character) {
                            list.push(char)
                        }
                    })
                    return list
                }, [])
                setupGame(data.docs, charsWithLines)
                setCharacters(charsWithLines)
            })
        })                      // <---- end of function
        setTimeout(() => {
        setAnswered(false)
    }, 1500);
    }
    
    const setupGame = (data, chars) => {
        let quote = data[Math.floor(Math.random() * data.length)]
        setTheQuote(quote)
        let correctAnswer = chars.find(char => char._id === quote.character)
        setAnswer(correctAnswer.name)
        console.log(correctAnswer.name)
        let threeWrongChoices = []
        let randomChoice = () => {
            let randomName = chars[Math.floor(Math.random() * chars.length)].name
            if (threeWrongChoices.includes(randomName) === false && 
                randomName !== correctAnswer.name) {
            threeWrongChoices.push(randomName)
            }
        }
        while(threeWrongChoices.length < 3) {
        randomChoice()
        }
        setChoices([correctAnswer.name, ...threeWrongChoices ])
    }

    useEffect(() => {
        let chars
        fetchCharacters()
        .then(data => {
          chars = data.docs
        })
        .then(() => {
          fetchAllQuotes()
          .then(data => {
            setQuotes(data.docs)
            let charsWithLines = chars.reduce((list, char) => {
                data.docs.forEach(doc => {
                    if (char._id === doc.character) {
                        list.push(char)
                    }
                })
                return list
            }, [])
            setupGame(data.docs, charsWithLines)
            setCharacters(charsWithLines)
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
            <Link to="/library" className="study-hall-link"><button className="study-hall-button">Study Hall</button></Link>
        </div> : <div className="game"><h1 className="reply">{reply}</h1></div>
    ) : <div className="game"><h1 className="loading">Forging the ring...</h1></div>
}

export default Game