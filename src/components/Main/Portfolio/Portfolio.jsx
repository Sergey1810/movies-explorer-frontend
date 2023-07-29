import React from 'react'
import arrow from '../../../images/arrow.svg'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Статичный сайт</h2>
            <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </div>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Адаптивный сайт</h2>
            <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </div>
        <div className='portfolio__items'>
            <h2 className='portfolio__items-title'>Одностраничное приложение</h2>
            <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </div>
    </section>
  )
}
