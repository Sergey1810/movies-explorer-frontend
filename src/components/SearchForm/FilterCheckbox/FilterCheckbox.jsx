import React from 'react'
import './FilterCheckbox.css'
import { useLocation } from 'react-router-dom'

export default function FilterCheckbox({checkbox, handleChecked, checkboxSave}) {
    const location = useLocation()
    return ( 
        <div className="filterCheckbox">
            <label className="filterCheckbox__toggle">
                <input className="filterCheckbox__checkbox" 
                value={(location.pathname==='/movies')?checkbox:checkboxSave} 
                checked={(location.pathname==='/movies')?checkbox:checkboxSave}
                type="checkbox" onChange={handleChecked}/>
                <span className="filterCheckbox__slider" />
            </label>
            <p className="filterCheckbox__title">Короткометражки</p>
        </div>
    )
}
