import React from 'react'
import { Link } from 'react-router-dom'
import './Errors.css'

export default function Errors() {
  return (
    <main className='errors'>
        <h1 className='errors__title'>404</h1>
        <p className='errors__subtitle'>Страница не найдена</p>
        <Link className='errors__link' to='/'>Назад</Link>
    </main>
  )
}
