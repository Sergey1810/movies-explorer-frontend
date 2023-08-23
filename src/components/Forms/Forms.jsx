import React, { useState, useEffect } from 'react'
import './Forms.css'

export default function Forms() {
    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState('false')
    const [nameError, setNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState('false')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState('false')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(true)

    useEffect(() => {
        if (nameError || emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, passwordError])

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 4) {
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
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError('Что-то пошло не так...')
        } else {
            setPasswordError("")
        }
    }

    return (
        <form className='forms'>
            <div className='forms__container'>
                <label for="Name" className='forms__label'>Имя</label>
                <input
                    onBlur={e => blurHandler(e)}
                    className='forms__input'
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => nameHandler(e)}
                    placeholder='Имя'
                    required
                ></input>
                {(nameDirty && nameError) && <p className="forms__error">{nameError}</p>}
                <label for="email" className='forms__label'>Email</label>
                <input
                    onBlur={e => blurHandler(e)}
                    className='forms__input'
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => emailHandler(e)}
                    placeholder='Email'
                    required
                ></input>
                {(emailDirty && emailError) && (
                    <p className="forms__error">{emailError}</p>
                )}
                <label for="password" className='forms__label'>Пароль</label>
                <input
                    onBlur={e => blurHandler(e)}
                    className='forms__input'
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => passwordHandler(e)}
                    placeholder='Пароль'
                    required
                ></input>
                {(passwordDirty && passwordError) && (
                    <p className="forms__error">
                        {passwordError}
                    </p>
                )}
            </div>
            <button disabled={!formValid} type="submit" className='forms__button'>Зарегистрироваться</button>
        </form>
    )
}
