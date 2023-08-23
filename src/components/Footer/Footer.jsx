import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__info'>
            <p className='footer__info-content'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        </div>
        <div className='footer__content'>
            <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
            <ul className='footer__nav'>
                <li className='footer__nav-link'><a href='https://practicum.yandex.ru' target="_blank" className='footer__link'>Яндекс.Практикум</a></li>
                <li className='footer__nav-link'><a href='https://github.com/Sergey1810' target="_blank" className='footer__link'>Github</a></li>
            </ul>
        </div>
    </footer>
  )
}
