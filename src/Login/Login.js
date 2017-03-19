import React, {Component} from 'react'
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'

import facebook from './facebook.svg'
import github from './github.svg'
import google from './google.svg'
import twitter from './twitter.svg'

import './Login.css'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'

const messages = defineMessages({
  signInWithFacebook: {
    id: 'Login.SignInWithFacebook',
    defaultMessage: 'Sign in with Facebook'
  },
  signInWithGitHub: {
    id: 'Login.SignInWithGitHub',
    defaultMessage: 'Sign in with GitHub'
  },
  signInWithGoogle: {
    id: 'Login.SignInWithGoogle',
    defaultMessage: 'Sign in with Google'
  },
  signInWithTwitter: {
    id: 'Login.SignInWithTwitter',
    defaultMessage: 'Sign in with Twitter'
  }
})

class Login extends Component {
  constructor (props) {
    super(props)

    this.onSignInWith = this.onSignInWith.bind(this)
  }

  onSignInWith (Provider) {
    return async () => {
      const { base } = this.props

      try {
        await base.auth().signInWithPopup(new Provider())

        browserHistory.push('/me')
      } catch (error) {
        console.error(error)
      }
    }
  }

  render () {
    const { base, intl } = this.props

    const {
      FacebookAuthProvider,
      GithubAuthProvider,
      GoogleAuthProvider,
      TwitterAuthProvider
    } = base.auth

    return (
      <div className='Login'>
        <div className='LoginTitle Title'>
          <FormattedMessage id='Login.LogInSignUpWith' defaultMessage='Sign in to get started' />
        </div>
        <ButtonGroup>
          <Button className='LoginButton Facebook' onClick={this.onSignInWith(FacebookAuthProvider)}>
            <img src={facebook} alt={intl.formatMessage(messages.signInWithFacebook)} />
          </Button>
          <Button className='LoginButton Google' onClick={this.onSignInWith(GoogleAuthProvider)}>
            <img src={google} alt={intl.formatMessage(messages.signInWithGoogle)} />
          </Button>
          <Button className='LoginButton Twitter' onClick={this.onSignInWith(TwitterAuthProvider)}>
            <img src={twitter} alt={intl.formatMessage(messages.signInWithTwitter)} />
          </Button>
          <Button className='LoginButton GitHub' onClick={this.onSignInWith(GithubAuthProvider)}>
            <img src={github} alt={intl.formatMessage(messages.signInWithGitHub)} />
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

Login.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Login)
