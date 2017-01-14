import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Home.css'

import Form from '../Form'
import FormService from '../FormService'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDemoFormRendered: false
    }

    this.onGetStartedClicked = this.onGetStartedClicked.bind(this)
  }

  onGetStartedClicked () {
    this.setState({
      isDemoFormRendered: true
    })
  }

  render () {
    const { isDemoFormRendered } = this.state

    return (
      <div className='Home'>
        <div className='HomeTitle Title'>
          <FormattedMessage id='Home.CraftFantasticForms' defaultMessage='Craft fantastic forms.' />
        </div>
        <div className='HomeSubtile Subtitle'>
          <FormattedMessage id='Home.SoHowEasyIsit' defaultMessage='So, how easy is it?' />
        </div>
        <button onClick={this.onGetStartedClicked}>
          <FormattedMessage id='Home.GetStarted' defaultMessage='Get started' />
        </button>
        { isDemoFormRendered && <Form inputs={FormService.getDefault()} /> }
      </div>
    )
  }
}

export default Home
