import React, {Component} from 'react'

import './Connect.css'

import PaymentService from '../PaymentService'

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
    const { isConnected } = nextState

    const { code } = location.query

    if (this.isConnecting || isConnected || !user) {
      return
    }

    this.isConnecting = true

    try {
      const userToken = await base.auth().currentUser.getToken()
      const response = await PaymentService.connect({ code, userToken })
      const json = await response.json()

      this.setState({
        isConnected: response.ok,
        json
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.isConnecting = false
    }
  }

  render () {
    const { isConnected, json } = this.state

    return (
      <div className='Connect'>
        { isConnected ? (
          <Text content={'Connected!'} />
        ) : json && json.error_description ? (
          <Text content={json.error_description} />
        ) : (
          <Text content={'Connecting...'} />
        )}
      </div>
    )
  }
}

export default Connect
