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
            <div className='techs__flex'>
              <div className='techs__flex-item'>HTML</div>
              <div className='techs__flex-item'>CSS</div>
              <div className='techs__flex-item'>JS</div>
              <div className='techs__flex-item'>React</div>
              <div className='techs__flex-item'>Git</div>
              <div className='techs__flex-item'>Express.js</div>
              <div className='techs__flex-item'>mongoDB</div>
            </div>
        </section>
    )
}
