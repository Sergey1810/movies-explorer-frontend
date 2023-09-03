import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'

export default function MoviesCardList({ movies, myMovies, handleLikeMovies, handleDeleteMovies, handleAddMovies, isAddButton }) {
    const location = useLocation() 

    let moviesLocalStorage = JSON.parse(localStorage.getItem('movies'))



    return (
        <section className='moviesCardList'>
            <ul className='moviesCardList__list'>
                {location.pathname === '/movies' ?
                    (movies.length > 0 ? movies.map((card) => <MoviesCard
                        key={card.id ? card.id : card._id}
                        card={card}
                        myMovies={myMovies}
                        handleLikeMovies={handleLikeMovies}
                        handleDeleteMovies={handleDeleteMovies}
                    />): null )
                    :
                    (myMovies.length > 0 ? myMovies.map((card) => <MoviesCard
                        key={card.id ? card.id : card._id}
                        card={card}
                        movies={myMovies}
                        handleLikeMovies={handleLikeMovies}
                        handleDeleteMovies={handleDeleteMovies}
                    />): null)
                }
            </ul>
            {location.pathname === '/movies'&& !isAddButton && <div className='moviesCardList__add'>
               {((movies?movies.length:[]) < (moviesLocalStorage?moviesLocalStorage.length:[])) ? <button className='moviesCardList__button' type='button' onClick={handleAddMovies}>Ещё</button> : ''}
            </div>}

        </section>
    )
}
