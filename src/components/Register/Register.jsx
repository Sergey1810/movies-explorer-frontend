import React from 'react'
import Forms from '../Forms/Forms'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import './Register.css'

export default function Register() {
    return (
        <main className='register'>
            <section className='register__container'>
                <Logo />
                <h1 className='register__title'>Добро пожаловать!</h1>
                <Forms />
                <p className='register__text'>
                    Уже зарегистрированы?
                    <Link to='/signin' className='register__link'> Войти</Link>
                </p>
            </section>
        </main>
    )
}
