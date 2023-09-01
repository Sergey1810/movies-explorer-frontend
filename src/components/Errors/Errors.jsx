import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Errors.css'

export default function Errors() {
  const navigate = useNavigate()

  return (
    <main>
      <section className='errors'>
        <h1 className='errors__title'>404</h1>
        <p className='errors__subtitle'>Страница не найдена</p>
        <button className='errors__link'  onClick={() => navigate(-1)}>Назад</button>
      </section>
    </main>
  )
}
