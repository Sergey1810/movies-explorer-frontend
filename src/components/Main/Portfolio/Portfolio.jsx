import React from 'react'
import arrow from '../../../images/arrow.svg'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__items'>
        <a href='https://sergey1810.github.io/russian-travel/' target="_blank" className='portfolio__items-link'>
          <h2 className='portfolio__items-title'>Статичный сайт</h2>
          <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </a>
      </div>
      <div className='portfolio__items'>
        <a href='https://github.com/Sergey1810/mesto-react' target="_blank" className='portfolio__items-link'>
          <h2 className='portfolio__items-title'>Адаптивный сайт</h2>
          <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </a>
      </div>
      <div className='portfolio__items'>
        <a href='https://github.com/Sergey1810/react-mesto-auth' target="_blank" className='portfolio__items-link'>
          <h2 className='portfolio__items-title'>Одностраничное приложение</h2>
          <img src={arrow} alt="arrow" className='portfolio__items-icon' />
        </a>
      </div>
    </section>
  )
}
