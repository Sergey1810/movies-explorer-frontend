import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './SavedMovies.css'

export default function SavedMovies({isAuth, myMovies, handleDeleteMovies}) {
    return (
        <>
            <Header isAuth={isAuth}/>
            <main className='savedMovies'>
                <SearchForm />
                <MoviesCardList movies={myMovies} handleDeleteMovies={handleDeleteMovies}/>
            </main>
            <Footer />
        </>
    )
}
