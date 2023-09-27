import React, { useState } from 'react'
import buttonIcon from '../../images/headerButtonIcons.svg'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    const [mobileActive, setMobileActive] = useState(false)
    const location = useLocation() 

    const handleMobileNav = () => {
      setMobileActive(!mobileActive)
    }

    return (
        <div className='navigation'>
            <div className={`navigation__overlay ${mobileActive && 'navigation__overlay_opened'}`}>
                <nav className='navigation__menu'>
                    <ul className="navigation__items">
                    <li className='navigation__item navigation__item_menu-width768_active'><Link to='/' className='navigation__item-link '>Главная</Link></li>
                        <li className='navigation__item'><Link to='/movies' className={`navigation__item-link ${(location.pathname==='/'&&'navigation__item-link-main')} navigation__item-link_active`}>Фильмы</Link></li>
                        <li className='navigation__item'><Link to='/saved-movies' className={`navigation__item-link ${(location.pathname==='/'&&'navigation__item-link-main')}`}>Сохраненные фильмы</Link></li>
                    </ul>
                    <div className='navigation__button'>
                        <Link to='/profile' className='navigation__button-link'>
                            <p className='navigation__button-name'>Аккаунт</p>
                            <img src={buttonIcon} alt="кнопка войти" className='navigation__button-icon' />
                        </Link>
                    </div>
                </nav>
            </div>
            <button className={`navigation__burger ${mobileActive && 'navigation__burger_opened'}`} type='button' onClick={handleMobileNav}>
            </button>
        </div>
    )
}
