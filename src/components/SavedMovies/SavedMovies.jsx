import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import './SavedMovies.css'

export default function SavedMovies({isAuth, myMovies, handleDeleteMovies, searchMovies, errorMessage, isLoading, toggleSaveSearchMovies}) {
    return (
        <>
            <Header isAuth={isAuth}/>
            <main className='savedMovies'>
                <SearchForm searchMovies={searchMovies} myMovies={myMovies} toggleSaveSearchMovies={toggleSaveSearchMovies}/>
                {isLoading && <Preloader />}
                {errorMessage && <span className="movies__error">{errorMessage}</span>}
                {myMovies?<MoviesCardList myMovies={myMovies} handleDeleteMovies={handleDeleteMovies}/>:null}
            </main>
            <Footer />
        </>
    )
}
