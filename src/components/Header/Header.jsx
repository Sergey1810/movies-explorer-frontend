import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'

export default function Header() {
    const location = useLocation()
    return (
        <header className={`header ${location.pathname === '/' ? 'header__main' : null}`}>
            <Link to='/' className='header__logo'><Logo /></Link>
            {location.pathname !== '/' ? <Navigation/>
            :
                <div className="header__auth">
                    <Link to='/signup' className='header__auth-link'>Регистрация</Link>
                    <Link to='/profile' className='header__auth-button-link'><button className='header__auth-button'>Войти</button></Link>
                </div>}
        </header>
    )
}
