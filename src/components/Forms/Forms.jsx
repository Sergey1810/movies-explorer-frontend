import React, { useState, useEffect } from 'react'
import './Forms.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { mainApi } from '../../utils/MainApi'

export default function Forms(props) {
    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState('false')
    const [nameError, setNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState('false')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState('false')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(false)
    const [errors, setErrors] = useState('')

    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/signup') {
            if (!name || !email || !password) {
                setFormValid(false)
            } else if (nameError || emailError || passwordError) {
                setFormValid(false)
            } else {
                setFormValid(true)
            }
        } else if (location.pathname === '/signin') {
            if (!email || !password) {
                setFormValid(false)
            } else if (passwordError || emailError) {
                setFormValid(false)
            } else {
                setFormValid(true)
            }

        }

    }, [name, email, password])

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

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError('Что-то пошло не так...')
        } else {
            setPasswordError("")
        }
    }
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        mainApi.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setEmail('');
                    setPassword('');
                    props.handleLogin();
                    navigate('/movies', { replace: true });
                }
            })
            .catch((e) => setErrors(`Произошла ошибка`));
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (password && email && password) {
            mainApi.register(email, password, name)
                .then((data) => {
                    if (data) {
                        mainApi.authorize(password, email)
                            .then((data) => {
                                if (data.token) {
                                    localStorage.setItem('token', data.token);
                                    setEmail('');
                                    setPassword('');
                                    props.handleLogin();
                                    setErrors('')
                                    navigate('/movies', { replace: true });
                                }
                            })
                            .catch((e) => setErrors(`Произошла ошибка`));
                    }
                    navigate('/movies', { replace: true });
                })
                .catch((e) => setErrors(`Произошла ошибка`))

        }
    }

    return (
        <form className='forms' onSubmit={location.pathname === '/signup' ? handleSubmitRegister : handleSubmitLogin}>
            <div className='forms__container'>
                {location.pathname === '/signup' ? <>
                    <label className='forms__label'>Имя</label>
                    <input
                        onBlur={e => blurHandler(e)}
                        className='forms__input'
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => nameHandler(e)}
                        placeholder='Имя'
                        minLength="2"
                        maxLength="30"
                        required
                    ></input>
                    {(nameDirty && nameError) && <p className="forms__error">{nameError}</p>}
                </> : null}

                <label className='forms__label'>Email</label>
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

                <label className='forms__label'>Пароль</label>
                <input
                    onBlur={e => blurHandler(e)}
                    className='forms__input'
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => passwordHandler(e)}
                    placeholder='Пароль'
                    minLength="4"
                    maxLength="30"
                    required
                ></input>
                {(passwordDirty && passwordError) && (
                    <p className="forms__error">
                        {passwordError}
                    </p>
                )}
            </div>
            <span className='forms__error'>{`${errors}`}</span>
            <button disabled={!formValid} type="submit" className='forms__button'>{location.pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}</button>
        </form>
    )
}
