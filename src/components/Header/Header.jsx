import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'

export default function Header() {

    const location = useLocation()

    return (
        <header className={`header ${location.pathname === '/' ? 'header__main' : null}`}>
            <div className='header__logo'><Logo /></div> 
            {location.pathname !== '/' ? <Navigation />
                :
                <nav className="header__auth">
                    <Link to='/signup' className='header__auth-link'>Регистрация</Link>
                    <Link to='/signin' className='header__auth-button-link'>
                        <button className='header__auth-button' type='button'>Войти</button>
                    </Link>
                </nav>}
        </header>
    )
}
