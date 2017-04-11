import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import './Profile.css'

import PaymentService from '../PaymentService'

import FormList from '../FormList'
import Loading from '../Loading'
import Subtitle from '../Subtitle'
import Text from '../Text'
import Title from '../Title'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      queries: {
        orderByChild: 'user',
        equalTo: nextProps.user ? nextProps.user.uid : undefined
      }
    })
  }

  render () {
    const { base, user } = this.props
    const { queries } = this.state

    return user ? (
      <div className='Profile'>
        <Title>{user.displayName}</Title>
        <Subtitle>{user.email}</Subtitle>
        <hr />
        {
          PaymentService.isConnected(user) ? (
            <div className='ProfilePayment'>
              <Text>
                <FormattedMessage id='Profile.PaymentConnected' defaultMessage="You're ready to start accepting payments!" />
              </Text>
            </div>
          ) : PaymentService.isDeferred(user) ? (
            <div className='ProfilePayment'>
              <Text>
                <FormattedMessage id='Profile.PaymentDeferred' defaultMessage="You're ready to start accepting payments!" />
              </Text>
            </div>
          ) : (
            <div className='ProfilePayment'>
              <Text>
                <FormattedMessage id='Profile.PaymentNotConnected' defaultMessage="It looks like you haven't connected your account to our payment provider yet. We'll automatically create an account for you so you can start accepting payments instantly!" />
              </Text>
              <a href={PaymentService.getConnectLink()}>Get started</a>
            </div>
          )
        }
        <hr />
        <FormList base={base} queries={queries} />
        <hr />
        <Link className='Button cancel' to='/sign-out'>
          <FormattedMessage id='Profile.SignOut' defaultMessage='Sign out' />
        </Link>
      </div>
    ) : <Loading />
  }
}

Profile.propTypes = {
}

export default Profile
