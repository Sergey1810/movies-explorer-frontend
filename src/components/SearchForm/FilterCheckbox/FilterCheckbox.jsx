import React, { useState } from 'react'
import './FilterCheckbox.css'

export default function FilterCheckbox() {
    const [checked, setChecked] = useState(true)
    const handleChecked = () => {
        setChecked(!checked)
    }

    return ( 
        <div className="filterCheckbox">
            <label className="filterCheckbox__toggle">
                <input className="filterCheckbox__checkbox" value={checked} type="checkbox" checked={checked} onChange={handleChecked}/>
                <span className="filterCheckbox__slider" />
            </label>
            <p className="filterCheckbox__title">Короткометражки</p>
        </div>
    )
}
