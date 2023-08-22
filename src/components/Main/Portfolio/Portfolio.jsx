import React from 'react'
import arrow from '../../../images/arrow.svg'
import './Portfolio.css'
import { Link } from 'react-router-dom'

export default function Portfolio() {
  return (
    <section className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Статичный сайт</h2>
           <a href='https://sergey1810.github.io/russian-travel/'><img src={arrow} alt="arrow" className='portfolio__items-icon' /></a> 
        </div>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Адаптивный сайт</h2>
            <a href='https://github.com/Sergey1810/mesto-react'><img src={arrow} alt="arrow" className='portfolio__items-icon' /></a>
        </div>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Одностраничное приложение</h2>
            <a href='https://github.com/Sergey1810/react-mesto-auth'><img src={arrow} alt="arrow" className='portfolio__items-icon' /></a>
        </div>
    </section>
  )
}
