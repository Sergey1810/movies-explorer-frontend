import React from 'react'
import Logo from '../Logo/Logo'
import Forms from '../Forms/Forms'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login(props) {
  return (
    <main className='login'>
      <section className='login__container'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
        <Forms handleLogin={props.handleLogin} />
        <p className='login__text'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='login__link'> Регистрация</Link>
        </p>
      </section>
    </main>
  )
}
