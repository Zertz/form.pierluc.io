import React, {Component} from 'react'
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl'
import { Link } from 'react-router'

import './Profile.css'

import PaymentService from '../PaymentService'

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
  },
  modify: {
    id: 'Profile.Modify',
    defaultMessage: 'Modify'
  },
  preview: {
    id: 'Profile.Preview',
    defaultMessage: 'Preview'
  }
})

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      forms: null,
      isLoadingForms: true
    }

    this.bindFormsToState = this.bindFormsToState.bind(this)
  }

  componentDidMount () {
    this.bindFormsToState()
  }

  componentDidUpdate (prevProps, prevState) {
    this.bindFormsToState()
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.formsRef)

    this.formsRef = null
  }

  bindFormsToState () {
    const { base, user } = this.props

    if (!this.formsRef && user) {
      this.formsRef = base.bindToState('forms', {
        context: this,
        state: 'forms',
        asArray: true,
        queries: {
          orderByChild: 'user',
          equalTo: user.uid
        },
        then () {
          this.setState({
            isLoadingForms: false
          })
        }
      })
    }
  }

  render () {
    const { intl, user } = this.props
    const { isLoadingForms, forms } = this.state

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
        <ul className='ProfileFormList'>
          { isLoadingForms ? <Loading /> : forms.map((form, index) => (
            <li className='ProfileFormListItem' key={form.key}>
              <Text content={form.name || form.key} />
              <Link className='ProfileLink' activeClassName='ProfileLinkActive' to={`/browse/${form.key}/edit`}>{intl.formatMessage(messages['modify'])}</Link>
              <Link className='ProfileLink' activeClassName='ProfileLinkActive' to={`/browse/${form.key}`}>{intl.formatMessage(messages['preview'])}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <Link to='/disconnect'>
          <FormattedMessage id='Profile.Disconnect' defaultMessage='Disconnect' />
        </Link>
      </div>
    ) : null
  }
}

Profile.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Profile)
