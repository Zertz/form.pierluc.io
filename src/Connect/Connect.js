import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Connect.css'

import PaymentService from '../PaymentService'

import Loading from '../Loading'
import Text from '../Text'

class Connect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isConnecting: false,
      isConnected: false
    }
  }

  async componentWillUpdate (nextProps, nextState) {
    const { base, location, user } = nextProps
    const { isConnecting, isConnected } = nextState

    const { code } = location.query

    if (isConnecting || isConnected || !user) {
      return
    }

    this.setState({
      isConnecting: true
    })

    try {
      const token = await base.auth().currentUser.getToken()
      const response = await PaymentService.connect({ code, token })
      const json = await response.json()

      this.setState({
        isConnected: response.ok,
        json
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        isConnecting: false
      })
    }
  }

  render () {
    const { isConnecting, isConnected, json } = this.state

    return (
      <div className='Connect'>
        {isConnecting || (!isConnecting && !isConnected) ? (
          <Loading>
            <FormattedMessage id='Connect.Connecting' defaultMessage='Connecting...' />
          </Loading>
        ) : isConnected ? (
          <Text>
            <FormattedMessage id='Connect.Connected' defaultMessage='Connected!' />
          </Text>
        ) : json && json.error_description ? (
          <Text>{json.error_description}</Text>
        ) : (
          <Text>
            <FormattedMessage id='Connect.SadFace' defaultMessage=':(' />
          </Text>
        )}
      </div>
    )
  }
}

export default Connect
