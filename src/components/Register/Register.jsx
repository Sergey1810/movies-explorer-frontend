import React from 'react'
import Forms from '../Forms/Forms'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import './Register.css'

export default function Register() {
    return (
        <section className='register'>
            <div className='register__container'>
            <Logo />
            <h2 className='register__title'>Добро пожаловать!</h2>
            <Forms />
            <p className='register__text'>
                Уже зарегистрированы?
                <Link to='/signin' className='register__link'> Войти</Link>
            </p>
            </div>
        </section>
    )
}
