import React, {Component} from 'react'
import { Link } from 'react-router'

import './Menu.css'

class Menu extends Component {
  render () {
    const { user } = this.props

    return (
      <ul className='Menu'>
        <li className='MenuItem'>
          { user ? <Link to="/logout">Log out</Link> : <Link to="/login">Log in</Link> }
        </li>
      </ul>
    )
  }
}

export default Menu
