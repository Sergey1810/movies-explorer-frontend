import React from 'react'
import './Techs.css'

export default function Techs() {
    return (
        <section className='techs'>
            <h2 className='techs__title'>Технологии</h2>
            <div className='techs__contents'>
                <h2 className='techs__contents-title'>7 технологий</h2>
                <p className='techs__contents-subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className='techs__flex'>
              <li className='techs__flex-item'>HTML</li>
              <li className='techs__flex-item'>CSS</li>
              <li className='techs__flex-item'>JS</li>
              <li className='techs__flex-item'>React</li>
              <li className='techs__flex-item'>Git</li>
              <li className='techs__flex-item'>Express.js</li>
              <li className='techs__flex-item'>mongoDB</li>
            </ul>
        </section>
    )
}
