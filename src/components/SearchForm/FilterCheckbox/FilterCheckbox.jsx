import React from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox({checked, handleChecked}) {
  
    return ( 
        <div className="filterCheckbox">
            <label className="filterCheckbox__toggle">
                <input className="filterCheckbox__checkbox" value={!checked} type="checkbox" onChange={handleChecked}/>
                <span className="filterCheckbox__slider" />
            </label>
            <p className="filterCheckbox__title">Короткометражки</p>
        </div>
    )
}
