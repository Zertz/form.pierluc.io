import React, {Component} from 'react'
import { Link } from 'react-router'

import logo from '../logo.svg'

import './Header.css'

class Header extends Component {
  render () {
    const { user } = this.props

    return (
      <div className='Header'>
        <Link to='/'>
          <img src={logo} className='HeaderLogo' alt='logo' />
        </Link>
        <div className='HeaderTitle Title'>Form</div>
        <ul className='HeaderMenu'>
          <li className='HeaderMenuItem'>
            <Link to='/browse'>Browse</Link>
          </li>
          <li className='HeaderMenuItem'>
            <Link to='/create'>Create</Link>
          </li>
          <li className='HeaderMenuItem'>
            { user ? <Link to='/logout'>Disconnect</Link> : <Link to='/login'>Connect</Link> }
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
