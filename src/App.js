import React, {useEffect, useState} from 'react';
import './App.css';
import SingleCard from './components/SingleCard'

const cardsImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffling the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
    .sort(() => Math.random() - 0.5) // when a negative number, items will remain same order, otherwise switch order
    .map((card) => ({...card, id: Math.random(), matched: false}))
    console.log(shuffledCards)

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // 
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 700)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // Resetting the choices and increaing the turn counter
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  // Starting the game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched === true } disabled={disabled}/>
        ))}
      </div>

    <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
