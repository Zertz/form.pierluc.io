import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import logo from '../logo.svg'

import './Header.css'

import HeaderLink from '../HeaderLink'
import Title from '../Title'

class Header extends Component {
  render () {
    const { user } = this.props

    return (
      <div className='Header'>
        <Link to='/'>
          <img src={logo} className='HeaderLogo' alt='logo' />
        </Link>
        <Title content={'Form'} />
        <ul className='HeaderMenu'>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/browse'>
              <FormattedMessage id='Header.Browse' defaultMessage='Browse' />
            </HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            <HeaderLink to='/create'>
              <FormattedMessage id='Header.Create' defaultMessage='Create' />
            </HeaderLink>
          </li>
          <li className='HeaderMenuItem'>
            { user
              ? <HeaderLink to='/me'>
                <FormattedMessage id='Header.MyForm' defaultMessage='My Form' />
              </HeaderLink>
              : <HeaderLink to='/connect'>
                <FormattedMessage id='Header.Connect' defaultMessage='Connect' />
              </HeaderLink> }
          </li>
        </ul>
      </div>
    )
  }
}

export default Header
