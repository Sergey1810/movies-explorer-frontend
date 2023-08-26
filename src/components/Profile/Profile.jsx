import React from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import './Profile.css'

export default function Profile() {
    return (
        <>
            <Header />
            <main className="profile">
                <form className="profile__form">
                    <h3 className="profile__title">Привет, Виталий!</h3>
                    <div className="profile__fields">
                        <p className="profile__text">Имя</p>
                        <div className="profile__area profile__area_type_name">
                            <input className="profile__input" placeholder='Виталий' />
                        </div>
                        <div className="profile__area profile__area_type_email">
                            <input className="profile__input" placeholder='pochta@yandex.ru' min={2} max={30} />
                        </div>
                        <p className="profile__text">E-mail</p>
                    </div>
                    <button className="profile__button" type='submit'>
                        Редактировать
                    </button>
                    <Link to='/'>
                        <button className="profile__signOut" type='button'>
                            Выйти из аккаунта
                        </button>
                    </Link>
                </form>
            </main>
        </>
    )
}
