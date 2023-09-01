import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import './Movies.css'

export default function Movies({ isAuth, isLoading, errorMessage, handleSearchMovies, movies, handleLikeMovies, checkShorts, myMovies, handleAddMovies, handleDeleteMovies, isAddButton }) {

    return (
        <>
            <Header isAuth={isAuth} />
            <main className='movies'>
                <SearchForm handleSearchMovies={handleSearchMovies} checkShorts={checkShorts} movies={movies} />
                {isLoading && <Preloader />}
                {errorMessage && <span className="movies__error">{errorMessage}</span>}
                {movies ? <MoviesCardList
                    isAddButton={isAddButton}
                    movies={movies}
                    myMovies={myMovies}
                    handleLikeMovies={handleLikeMovies}
                    handleAddMovies={handleAddMovies}
                    handleDeleteMovies={handleDeleteMovies}
                /> : null}
            </main>
            <Footer />
        </>
    )
}
