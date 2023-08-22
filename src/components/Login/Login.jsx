import React from 'react'
import Logo from '../Logo/Logo'
import Forms from '../Forms/Forms'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  return (
    <section className='register'>
    <div className='register__container'>
    <Logo />
    <h2 className='register__title'>Рады видеть!</h2>
    <Forms />
    <p className='register__text'>
        Уже зарегистрированы?
        <Link to='/signin' className='register__link'> Войти</Link>
    </p>
    </div>
</section>
  )
}
