import React from 'react'
import Logo from '../Logo/Logo'
import Forms from '../Forms/Forms'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  return (
    <main className='login'>
      <section className='login__container'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
        <Forms />
        <p className='login__text'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='login__link'> Регистрация</Link>
        </p>
      </section>
    </main>
  )
}
