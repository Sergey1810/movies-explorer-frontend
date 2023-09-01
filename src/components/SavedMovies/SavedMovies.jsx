import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './SavedMovies.css'

export default function SavedMovies({isAuth, myMovies, handleDeleteMovies, handleSearch}) {
    return (
        <>
            <Header isAuth={isAuth}/>
            <main className='savedMovies'>
                <SearchForm handleSearch={handleSearch} myMovies={myMovies}/>
                <MoviesCardList myMovies={myMovies} handleDeleteMovies={handleDeleteMovies}/>
            </main>
            <Footer />
        </>
    )
}
