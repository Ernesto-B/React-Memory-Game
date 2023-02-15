import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {


    
    const handleClick = () => {
        if (!disabled && !flipped){
            handleChoice(card)
        }
    }

  return (
    <div className='card'>
    <div className={flipped ? "flipped": ""}>
      <img src={card.src} alt="card front image" className='front' />
      <img src="img/cover.png" alt="card back image" className='back' onClick={handleClick}/>
    </div>
  </div>
  )
}
