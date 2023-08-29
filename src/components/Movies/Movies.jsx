import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './Movies.css'

export default function Movies({ isAuth, movies, handleSearchMovies, handleLikeMovies}) {
    return (
        <>
            <Header isAuth={isAuth} />
            <main className='movies'>
                <SearchForm handleSearchMovies={handleSearchMovies} />
                <MoviesCardList movies={movies} handleLikeMovies={handleLikeMovies} />
            </main>
            <Footer />
        </>
    )
}
