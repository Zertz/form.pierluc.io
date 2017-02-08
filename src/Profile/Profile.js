import React, {Component} from 'react'
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { Link } from 'react-router'

import './Profile.css'

import PaymentService from '../PaymentService'

import FormList from '../FormList'
import Loading from '../Loading'
import Subtitle from '../Subtitle'
import Text from '../Text'
import Title from '../Title'

const messages = defineMessages({
  paymentConnected: {
    id: 'Profile.PaymentConnected',
    defaultMessage: "You're ready to start accepting payments!"
  },
  paymentDeferred: {
    id: 'Profile.PaymentDeferred',
    defaultMessage: "You're ready to start accepting payments!"
  },
  paymentNotConnected: {
    id: 'Profile.PaymentNotConnected',
    defaultMessage: "It looks like you haven't connected your account to our payment provider yet. We'll automatically create an account for you so you can start accepting payments instantly!"
  }
})

class Profile extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        queries: {
          orderByChild: 'user',
          equalTo: nextProps.user.uid
        }
      })
    }
  }

  render () {
    const { base, intl, user } = this.props
    const { queries } = this.state || {}

    return user ? (
      <div className='Profile'>
        <Title content={user.displayName} />
        <Subtitle content={user.email} />
        <hr />
        {
          PaymentService.isConnected(user) ? (
            <div className='ProfilePayment'>
              <Text content={intl.formatMessage(messages.paymentConnected)} />
            </div>
          ) : PaymentService.isDeferred(user) ? (
            <div className='ProfilePayment'>
              <Text content={intl.formatMessage(messages.paymentDeferred)} />
            </div>
          ) : (
            <div className='ProfilePayment'>
              <Text content={intl.formatMessage(messages.paymentNotConnected)} />
              <a href={PaymentService.getConnectLink()}>Get started</a>
            </div>
          )
        }
        <hr />
        <FormList base={base} queries={queries} />
        <hr />
        <Link className='Button cancel' to='/disconnect'>
          <FormattedMessage id='Profile.Disconnect' defaultMessage='Disconnect' />
        </Link>
      </div>
    ) : <Loading />
  }
}

Profile.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Profile)
