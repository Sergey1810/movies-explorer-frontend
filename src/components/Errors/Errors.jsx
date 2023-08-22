import React from 'react'
import { Link } from 'react-router-dom'
import './Errors.css'

export default function Errors() {
  return (
    <div className='errors'>
        <h2 className='errors__title'>404</h2>
        <h3 className='errors__subtitle'>Страница не найдена</h3>
        <Link className='errors__link' to='/'>Назад</Link>
    </div>
  )
}
