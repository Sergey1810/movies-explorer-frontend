import React, { useEffect, useState } from 'react'
import './SearchForm.css'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

export default function SearchForm({handleSearchMovies}) {
    const [movie, setMovie] = useState('')
    const [checkbox, setCheckbox] = useState(false)
  
    const handleChecked =(e)=> {
      setCheckbox(e.target.checked) 
      handleSearchMovies(movie, checkbox)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      handleSearchMovies(movie, checkbox)
    }

    useEffect(() => {
        setCheckbox(JSON.parse(localStorage.getItem('shortFilms')) || false)
      }, [])

    return (
        <section className='searchForm'>
            <form className='searchForm__content' onSubmit={handleSubmit}>
                <div className='searchForm__container'>
                    <input type="text" placeholder='Фильм' className='searchForm__input' required value={movie} onChange={e => setMovie(e.target.value)}/>
                        <button className='searchForm__button' type='submit'>Найти</button>
                        <div className='searchForm__input-active'></div>
                </div>
                <FilterCheckbox checkbox={checkbox} handleChecked={handleChecked}/>
            </form>
        </section>
    )
}
