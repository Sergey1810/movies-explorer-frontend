import React from 'react'
import './MoviesCard.css'

export default function MoviesCard(card) {

    return (
        <li className='moviesCard'>
            <img src={card.card.img} alt={card.card.title} className='moviesCard__image' />
            <div className='moviesCard__content'>
                <h2 className='moviesCard__title'>{card.card.title}</h2>
                <button className='moviesCard__likes' type='button'></button>
            </div>
            <div className='moviesCard__line'></div>
            <p className='moviesCard__times'>{card.card.time}</p>
        </li>
    )
}
