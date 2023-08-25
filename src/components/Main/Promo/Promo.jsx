import React from 'react'
import './Promo.css'

export default function Promo() {
  return (
    <section className='promo'>
      <div className='promo__info'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href="#AboutProject">
          <button className='promo__button' type='button'>Узнать больше</button>
        </a>
      </div>
      <div className='promo__image'></div>
    </section>
  )
}
