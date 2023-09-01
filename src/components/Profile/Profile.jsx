import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Profile.css'
import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

export default function Profile({ isAuth, handleLoginOut, infoMessage, handleSubmitUpdateUsers }) {
    const users = useContext(CurrentUserContext)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('Что-то пошло не так...')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('Что-то пошло не так...')
    const [formValid, setFormValid] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitUpdateUsers(name, email)
    }

    const nameHandler = (e) => {
        const reg = /^[A-ZА-ЯЁ -]+$/i
        setName(e.target.value)
        if (!reg.test(String(e.target.value).toLowerCase())) {
            setNameError('Что-то пошло не так...')
        } else {
            setNameError("")
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setEmailError('Что-то пошло не так...')
        } else {
            setEmailError("")
        }
    }

    useEffect(() => {
        if (nameError || emailError) {
            setFormValid(false)
        } else if (users.name === name && users.email === email) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [nameError, emailError, name, email])

    return (
        <>
            <Header isAuth={isAuth} />
            <main>
                <section className="profile">
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <h1 className="profile__title">Привет, {users.name}!</h1>
                        <div className="profile__fields">
                            <p className="profile__text">Имя</p>
                            <div className="profile__area profile__area_type_name">
                                <input className="profile__input"
                                    placeholder={users.name}
                                    minLength="2"
                                    maxLength="30"
                                    value={name}
                                    onChange={nameHandler}
                                />
                                <span className='profile__error'>{nameError}</span>
                            </div>
                            <div className="profile__area profile__area_type_email">
                                <input className="profile__input"
                                    placeholder={users.email}
                                    minLength="2"
                                    maxLength="30"
                                    value={email}
                                    onChange={emailHandler} />
                                <span className='profile__error'>{emailError}</span>
                            </div>
                            <p className="profile__text">E-mail</p>
                        </div>
                        <span className='profile__text'>{infoMessage}</span>
                        <button className="profile__button" type='submit' disabled={!formValid}>
                            Редактировать
                        </button>
                        <button onClick={handleLoginOut} className="profile__signOut">
                            Выйти из аккаунта
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}
