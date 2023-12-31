import React from 'react'
import photo from '../../../images/myPhoto.png'
import './AboutMe.css'

export default function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__info'>
                <div className='about-me__info-column'>
                    <h3 className='about-me__info-title'>Виталий</h3>
                    <h4 className='about-me__info-subtitle'>Фронтенд-разработчик, 30 лет</h4>
                    <p className='about-me__info-paragraph'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
                        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a href="https://github.com/Sergey1810" rel="noopener noreferrer" target="_blank" className='about-me__info-link'>Github</a>
                </div>
                <img src={photo} alt="Фото автора" className='about-me__info-photo' />
            </div>
        </section>
    )
}
