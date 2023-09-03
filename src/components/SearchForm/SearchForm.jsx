import React, { useEffect, useState } from 'react'
import './SearchForm.css'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import { useLocation } from 'react-router-dom'

export default function SearchForm({ handleSearchMovies, searchMovies, toggleSearchMovies, toggleSaveSearchMovies }) {
    const [movie, setMovie] = useState('')
    const [saveMovie, setSaveMovie] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [checkboxSave, setCheckboxSave] = useState(false)
    const [search, setSearch] = useState('Фильм')

    const location = useLocation()

    const handleChecked = (e) => {
        if (location.pathname === '/movies') {
            const check = JSON.parse(localStorage.getItem('isShort'))
            if (check !== undefined) {
                setCheckbox(!check)
                localStorage.setItem('isShort', !check)
                toggleSearchMovies(!check, movie)
                return
            }
            setCheckbox(!checkbox)
            toggleSearchMovies(checkbox, movie)
        } else if (location.pathname === '/saved-movies') {
            const checks = JSON.parse(localStorage.getItem('isShortSave'))
            if (checks !== undefined) {
                setCheckboxSave(!checks)
                localStorage.setItem('isShortSave', checks)
                toggleSaveSearchMovies(!checks, movie)
                return
            }
            setCheckboxSave(!checkboxSave)
            toggleSaveSearchMovies(checkboxSave, saveMovie)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (location.pathname === '/movies') {
            if (movie === '') {
                setSearch('Нужно ввести ключевое слово')
            }
            handleSearchMovies(checkbox, movie)
        } else if (location.pathname === '/saved-movies') {
            searchMovies(checkboxSave, saveMovie)
            if (saveMovie === '') {
                setSearch('Нужно ввести ключевое слово')
            }
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            setCheckbox((JSON.parse(localStorage.getItem('isShort'))))
            setMovie(localStorage.getItem('searchText'))
        }else {
            setCheckboxSave((JSON.parse(localStorage.getItem('isShortSave'))))
            setSaveMovie(localStorage.getItem('searchSaveText'))
        }
    }, [location])

    return (
        <section className='searchForm'>
            <form className='searchForm__content' onSubmit={handleSubmit}>
                <div className='searchForm__container'>
                    <input type="text"
                        placeholder={search}
                        className='searchForm__input'
                        value={(location.pathname === '/movies') ? movie : saveMovie}
                        onChange={(location.pathname === '/movies') ? e => setMovie(e.target.value) : e => setSaveMovie(e.target.value)}
                    />
                    <button className='searchForm__button' type='submit'>Найти</button>
                    <div className='searchForm__input-active'></div>
                </div>
                <FilterCheckbox checkbox={checkbox} checkboxSave={checkboxSave} handleChecked={handleChecked} />
            </form>
        </section>
    )
}
