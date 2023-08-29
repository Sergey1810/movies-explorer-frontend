import React, { useState } from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'

export default function MoviesCard({ card, handleLikeMovies, handleDeleteMovies }) {
    const [movie, setMovie] = useState(card)

    const location = useLocation()

    function handleClick(){
        console.log(movie)
        handleLikeMovies(movie)
    }

    return (
        <li className='moviesCard'>
            <img src={(location.pathname === '/movies') ? `https://api.nomoreparties.co${card.image.url}` : card.image} alt={card.nameRU} className='moviesCard__image' />
            <div className='moviesCard__content'>
                <h2 className='moviesCard__title'>{card.nameRU}</h2>
                <button className={`moviesCard__likes ${(location.pathname ==='/saved-movies')?'moviesCard__likes_remove':null}` } type='button' onClick={handleClick}></button>
            </div>
            <div className='moviesCard__line'></div>
            <p className='moviesCard__times'>{Math.floor(card.duration / 60)}ч {card.duration % 60}м</p>
        </li>
    )
}
