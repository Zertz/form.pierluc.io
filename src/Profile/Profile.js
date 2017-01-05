import React, {Component} from 'react'
import { Link } from 'react-router'

import './Profile.css'

class Profile extends Component {
  render () {
    const { user } = this.props

    return user ? (
      <div className='Profile'>
        <div className='Title'>{user.displayName}</div>
        <div className='Subtitle'>{user.email}</div>
        <Link to='/disconnect'>Disconnect</Link>
      </div>
    ) : null
  }
}

export default Profile
