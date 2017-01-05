import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Login.css'

import Button from '../Button'

class Login extends Component {
  constructor (props) {
    super(props)

    this.onFacebook = this.onFacebook.bind(this)
    this.onGithub = this.onGithub.bind(this)
    this.onGoogle = this.onGoogle.bind(this)

    this.connectWith = this.connectWith.bind(this)
  }

  onFacebook () {
    this.connectWith(new this.props.base.auth.FacebookAuthProvider())
  }

  onGithub () {
    this.connectWith(new this.props.base.auth.GithubAuthProvider())
  }

  onGoogle () {
    this.connectWith(new this.props.base.auth.GoogleAuthProvider())
  }

  // Third-party authentication
  connectWith (provider) {
    const { base, router } = this.props

    base.auth().signInWithPopup(provider).then((res) => {
      router.push('/')
    }).catch((err) => {
      console.error(err)
    })
  }

  render () {
    return (
      <div className='Login'>
        <div className='LoginTitle Title'>
          <FormattedMessage id='Connect' defaultMessage='Connect' />
        </div>
        <Button text='Facebook' onClick={this.onFacebook} />
        <Button text='Google' onClick={this.onGoogle} />
        <Button text='GitHub' onClick={this.onGithub} />
      </div>
    )
  }
}

export default Login
