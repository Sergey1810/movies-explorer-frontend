import React from 'react'
import arrow from '../../../images/arrow.svg'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__items'>
          <a href='https://sergey1810.github.io/russian-travel/' rel="noopener noreferrer" target="_blank" className='portfolio__items-link'>
            <p className='portfolio__items-title'>Статичный сайт</p>
            <div className='portfolio__items-icons'>
              <img src={arrow} alt="стрела" className='portfolio__items-icon' />
            </div>
          </a>
        </li>
        <li className='portfolio__items'>
          <a href='https://github.com/Sergey1810/mesto-react' rel="noopener noreferrer" target="_blank" className='portfolio__items-link'>
            <p className='portfolio__items-title'>Адаптивный сайт</p>
            <div className='portfolio__items-icons'>
              <img src={arrow} alt="стрела" className='portfolio__items-icon' />
            </div>
          </a>
        </li>
        <li className='portfolio__items'>
          <a href='https://github.com/Sergey1810/react-mesto-auth' rel="noopener noreferrer" target="_blank" className='portfolio__items-link'>
            <p className='portfolio__items-title'>Одностраничное приложение</p>
            <div className='portfolio__items-icons'>
              <img src={arrow} alt="стрела" className='portfolio__items-icon' />
            </div>
          </a>
        </li>
      </ul>
    </section>
  )
}
