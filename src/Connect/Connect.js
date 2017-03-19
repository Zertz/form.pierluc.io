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
      const connect = await PaymentService.connect({ code, token })

      this.setState({
        isConnected: true,
        connect
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
    const { isConnecting, isConnected, connect } = this.state

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
        ) : connect && connect.error_description ? (
          <Text>{connect.error_description}</Text>
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
