import React, { useState } from 'react'
import buttonIcon from '../../images/headerButtonIcons.svg'
import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    const [mobileActive, setMobileActive] = useState(false)

    const handleMobileNav = () => {
      setMobileActive(!mobileActive)
    }

    return (
        <div className='navigation'>
            <div className={`navigation__overlay ${mobileActive && 'navigation__overlay_opened'}`}>
                <nav className='navigation__menu'>
                    <ul className="navigation__items">
                        <li className='navigation__item'><Link to='/movies' className='navigation__item-link navigation__item-link_active'>Фильмы</Link></li>
                        <li className='navigation__item'><Link to='/saved-movies' className='navigation__item-link'>Сохраненные фильмы</Link></li>
                    </ul>
                    <div className='navigation__button'>
                        <Link to='/profile' className='navigation__button-link'>
                            <p className='navigation__button-name'>Аккаунт</p>
                            <img src={buttonIcon} alt="кнопка войти" className='navigation__button-icon' />
                        </Link>
                    </div>
                </nav>
            </div>
            <button className='navigation__burger' type='button' onClick={handleMobileNav}>
            </button>
        </div>
    )
}
