import React, { useContext, useEffect, useState } from 'react'
import './MoviesCard.css'
import { useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function MoviesCard({ card, myMovies, handleLikeMovies, handleDeleteMovies}) {
    const users = useContext(CurrentUserContext)
    const [movie, setMovie] = useState(card)
    const [isSaved, setIsSaved] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/movies') {
            setIsSaved(myMovies.some(item => item.movieId === movie.id && item.owner === users._id))
        }
    }, [movie, isSaved, location, myMovies])


    const handleClick = () => {
        handleLikeMovies(movie)
    }

    function handleDelete() {
        if (location.pathname === '/saved-movies') {
            handleDeleteMovies(movie._id)
        }else if(location.pathname === '/movies'){
            myMovies.map(item => item.movieId === movie.id && handleDeleteMovies(item._id))
        }
        return
    }

        return (
            <li className='moviesCard'>
                <a className='moviesCard__link' href={location.pathname === '/saved-movies' ? card.trailer : card.trailerLink} target="_blank" rel="noreferrer">
                    <img src={location.pathname === '/saved-movies' ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} className='moviesCard__image' />
                </a>
                <div className='moviesCard__content'>
                    <h2 className='moviesCard__title'>{card.nameRU}</h2>
                    <button className={` ${(location.pathname === '/saved-movies') ? 'moviesCard__remove' : 'moviesCard__likes'} ${isSaved ? 'moviesCard__likes_active' : null}`}
                        type='button'
                        onClick={(location.pathname === '/movies' && !isSaved) ? handleClick : handleDelete}></button>
                </div>
                <div className='moviesCard__line'></div>
                <p className='moviesCard__times'>{Math.floor(card.duration / 60)}ч {card.duration % 60}м</p>
            </li>
        )
    }

