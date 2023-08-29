import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'

export default function MoviesCardList({movies, handleLikeMovies, handleDeleteMovies}) {
    
    return (
        <section className='moviesCardList'>
            <ul className='moviesCardList__list'>
                {movies.map((card) => <MoviesCard key={card.id&&card._id} card={card} handleLikeMovies={handleLikeMovies} handleDeleteMovies={handleDeleteMovies}/>)}
            </ul>
            <div className='moviesCardList__add'>
                <button className='moviesCardList__button' type='button'>Ещё</button>
            </div>
        </section>
    )
}
