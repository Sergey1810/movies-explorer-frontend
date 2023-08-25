import React from 'react'
import './SearchForm.css'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

export default function SearchForm() {
    return (
        <section className='searchForm'>
            <form className='searchForm__content'>
                <div className='searchForm__container'>
                    <input type="text" placeholder='Фильм' className='searchForm__input' required />
                        <button className='searchForm__button' type='submit'>Найти</button>
                        <div className='searchForm__input_active'></div>
                </div>
                <FilterCheckbox />
            </form>
        </section>
    )
}
