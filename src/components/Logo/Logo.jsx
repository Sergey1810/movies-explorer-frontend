import React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to='/'><div className='logo'></div></Link>
  )
}
