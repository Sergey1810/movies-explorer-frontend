import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'

export default function MoviesCardList() {

    const [massive, setMassive] = useState([{
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    },
    {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    },
    {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }, {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }, {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }
    , {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }, {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }, {
        img: 'https://avatars.mds.yandex.net/i?id=267b2fa5326ad6b5bd61d73f0b1e46106ac0e562-9181148-images-thumbs&n=13',
        title: 'Киноальманах «100 лет дизайна»',
        time: '1ч 42м'
    }

    ])
    return (
        <section className='moviesCardList'>
            <ul className='moviesCardList__list'>
                {massive.map((card, index) => <MoviesCard key={index} card={card} />)}
            </ul>
            <div className='moviesCardList__add'>
                <button className='moviesCardList__button' type='button'>Ещё</button>
            </div>
        </section>
    )
}
