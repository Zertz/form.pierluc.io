import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Logout.css'

class Logout extends Component {
  componentDidMount () {
    const { base } = this.props

    base.auth().signOut().then(() => {
      this.props.router.push('/')
    }, (err) => {
      console.error(err)
    })
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
