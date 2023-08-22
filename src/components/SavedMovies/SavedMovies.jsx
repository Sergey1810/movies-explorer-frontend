import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './SavedMovies.css'

export default function SavedMovies() {
    return (
        <div className='savedMovies'>
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </div>
    )
}
