import React, {Component} from 'react'

import './Connect.css'

import PaymentService from '../PaymentService'

import Text from '../Text'

class Connect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isConnected: false
    }
  }

  async componentWillUpdate (nextProps, nextState) {
    const { base, location, user } = nextProps
    const { isConnected } = nextState

    const { code } = location.query

    if (isConnected || !user) {
      return
    }

    try {
      const userToken = await base.auth().currentUser.getToken()
      const response = await PaymentService.connect({ code, userToken })
      const json = await response.json()

      this.setState({
        isConnected: true,
        json
      })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { isConnected, json } = this.state

    return (
      <div className='Connect'>
        { isConnected ? (
          <Text content={`Connected! ${JSON.stringify(json)}`} />
        ) : (
          <Text content={'Connecting...'} />
        )}
      </div>
    )
  }
}

export default Connect
