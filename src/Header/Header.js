import React from 'react'
import logo from './logo.svg'
import './Header.css'

function Header () {
  return (
    <div className='Header'>
      <img src={logo} className='HeaderLogo' alt='logo' />
      <h1 className='HeaderTitle'>form.pierluc.io</h1>
    </div>
  )
}

export default Header
