import React from 'react'
import './SearchForm.css'
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

export default function SearchForm() {
    return (
        <form className='searchForm'>
            <div className='searchForm__content'>
                <div className='searchForm__container'>
                    <input type="text" placeholder='Фильм' className='searchForm__input' />
                    <button className='searchForm__button'>Найти</button>
                </div>
                <FilterCheckbox />
            </div>
        </form>
    )
}
