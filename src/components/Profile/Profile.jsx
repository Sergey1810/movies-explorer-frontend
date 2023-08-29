import React from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import './Profile.css'
import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Profile() {

    const users = useContext(CurrentUserContext)

    return (
        <>
            <Header />
            <main>
                <section className="profile">
                    <form className="profile__form">
                        <h1 className="profile__title">Привет, {users.name}!</h1>
                        <div className="profile__fields">
                            <p className="profile__text">Имя</p>
                            <div className="profile__area profile__area_type_name">
                                <input className="profile__input"
                                    placeholder={users.name}
                                    minLength="2"
                                    maxLength="30" />
                            </div>
                            <div className="profile__area profile__area_type_email">
                                <input className="profile__input"
                                    placeholder={users.email}
                                    minLength="2"
                                    maxLength="30" />
                            </div>
                            <p className="profile__text">E-mail</p>
                        </div>
                        <button className="profile__button" type='submit'>
                            Редактировать
                        </button>
                        <Link to='/' className="profile__signOut">
                                Выйти из аккаунта
                        </Link>
                    </form>
                </section>
            </main>
        </>
    )
}
