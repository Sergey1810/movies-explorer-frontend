import React from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox() {
    return (
        <div className="filterCheckbox">
            <label className="filterCheckbox__toggle">
                <input className="filterCheckbox__checkbox" type="checkbox" />
                <span className="filterCheckbox__slider" />
            </label>
            <p className="filterCheckbox__title">Короткометражки</p>
        </div>
    )
}
