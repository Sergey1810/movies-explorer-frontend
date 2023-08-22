import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import './Movies.css'

export default function Movies() {
    return (
        <div className='movies'>
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </div>
    )
}
