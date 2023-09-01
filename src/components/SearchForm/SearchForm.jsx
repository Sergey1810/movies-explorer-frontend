import React, { useEffect, useState } from 'react'
import './SearchForm.css'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'
import { useLocation } from 'react-router-dom'

export default function SearchForm({ handleSearchMovies, checkShorts, movies, handleSearch, myMovies }) {
    const [movie, setMovie] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [search, setSearch] = useState('')

    const location = useLocation()

    const handleChecked = (e) => {
        setCheckbox(e.target.checked)
        if (location.pathname === '/movies') {
            handleSearchMovies(checkbox, movie)
        } else if (location.pathname === '/movies-saved') {
            handleSearch(movie, checkbox, myMovies)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (location.pathname === '/movies') {
            if (!movie) {
                setSearch('Нужно ввести ключевое слово')
            }
            handleSearchMovies(checkbox, movie)
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            setCheckbox(JSON.parse(localStorage.getItem('isShort')))
            setSearch(localStorage.getItem('searchText'))
        }
    }, [movie])

    return (
        <section className='searchForm'>
            <form className='searchForm__content' onSubmit={handleSubmit}>
                <div className='searchForm__container'>
                    <input type="text" placeholder={search?search:'Фильм'} className='searchForm__input' value={movie} onChange={e => setMovie(e.target.value)} />
                    <button className='searchForm__button' type='submit'>Найти</button>
                    <div className='searchForm__input-active'></div>
                </div>
                <FilterCheckbox checkbox={checkbox} handleChecked={handleChecked} />
            </form>
        </section>
    )
}
