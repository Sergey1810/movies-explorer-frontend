import React from 'react'
import './MoviesCard.css'

export default function MoviesCard(card) {

    return (
        <div className='moviesCard'>
            <img src={card.card.img} alt={card.card.title} className='moviesCard__image' />
            <div className='moviesCard__content'>
                <p className='moviesCard__title'>{card.card.title}</p>
                <button className='moviesCard__likes'></button>
            </div>
            <div className='moviesCard__line'></div>
            <p className='moviesCard__times'>{card.card.time}</p>
        </div>
    )
}
