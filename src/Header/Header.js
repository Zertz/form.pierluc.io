import React, {Component} from 'react'

import logo from '../logo.svg'

import './Header.css'

import HeaderLink from '../HeaderLink'

class Header extends Component {
  render () {
    const { user } = this.props

    return (
      <div className='Header'>
        <HeaderLink to='/'>
          <img src={logo} className='HeaderLogo' alt='logo' />
        </HeaderLink>
        <div className='HeaderTitle Title'>Form</div>
        <ul className='HeaderMenu'>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/browse'>Browse</HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/create'>Create</HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            { user ? <HeaderLink to='/me'>My Form</HeaderLink> : <HeaderLink to='/connect'>Connect</HeaderLink> }
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
