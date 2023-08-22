import React, { useState, useEffect } from 'react'
import './Forms.css'

export default function Forms() {
    const [inputFields, setInputFields] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        let errors = {};
        if (inputValues.name.length < 15) {
            errors.name = "Что-то пошло не так...";
        }
        if (!inputValues.email || regex.test(inputValues.email)) {
            errors.email = "Что-то пошло не так...";
        }
        if (inputValues.password.length < 8) {
            errors.password = "Что-то пошло не так...";
        }
        return errors;
    };
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
        }
    }, [errors]);

    return (
        <form onSubmit={handleSubmit}>
            <div className='forms__container'>
                <label for="Name" className='forms__label'>Имя</label>
                <input
                    className='forms__input'
                    type="text"
                    name="name"
                    value={inputFields.name}
                    onChange={handleChange}
                    placeholder='Имя'
                ></input>
                {errors.name ? <p className="forms__error">Что-то пошло не так...</p> : null}
                <label for="email" className='forms__label'>Email</label>
                <input
                    className='forms__input'
                    type="email"
                    name="email"
                    value={inputFields.email}
                    onChange={handleChange}
                    placeholder='Email'
                ></input>
                {errors.email ? (
                    <p className="forms__error">Что-то пошло не так...</p>
                ) : null}
                <label for="password" className='forms__label'>Пароль</label>
                <input
                    className='forms__input'
                    type="password"
                    name="password"
                    value={inputFields.password}
                    onChange={handleChange}
                    placeholder='Пароль'
                ></input>
                {errors.password ? (
                    <p className="forms__error">
                        Что-то пошло не так...
                    </p>
                ) : null}
            </div>
            <button type="submit" className='forms__button'>Зарегистрироваться</button>
        </form>
    )
}
