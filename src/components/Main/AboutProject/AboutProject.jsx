import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
    return (
        <section className='aboutProject' id={'AboutProject'}>
            <h2 className='aboutProject__title'>О проекте</h2>
            <div className='aboutProject__info'>
                <div className='aboutProject__info-column'>
                    <p className='aboutProject__info-column-title'>Дипломный проект включал 5 этапов</p>
                    <p className='aboutProject__info-column-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='aboutProject__info-column'>
                    <p className='aboutProject__info-column-title'>На выполнение диплома ушло 5 недель</p>
                    <p className='aboutProject__info-column-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutProject__scale'>
                <div className='aboutProject__back'>
                    <div className='aboutProject__scale-back'>1 неделя</div>
                    <p className='aboutProject__scale-lable'>Back-end</p>
                </div>
                <div className='aboutProject__front'>
                    <div className='aboutProject__scale-front'>4 недели</div>
                    <p className='aboutProject__scale-lable'>Front-end</p>
                </div>
            </div>
        </section>
    )
}
