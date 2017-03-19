import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'

import './Logout.css'

class Logout extends Component {
  async componentDidMount () {
    const { base } = this.props

    try {
      await base.auth().signOut()

      browserHistory.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <div className='Logout'>
        <FormattedMessage id='Logout.Disconnecting' defaultMessage='Disconnecting' />
      </div>
    )
  }
}

export default Logout
