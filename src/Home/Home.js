import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Home.css'

import Subtitle from '../Subtitle'
import Title from '../Title'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <Title>
          <FormattedMessage id='Home.CraftFantasticForms' defaultMessage='Craft fantastic forms.' />
        </Title>
        <Subtitle>
          <FormattedMessage id='Home.QuicklyEasily' defaultMessage='Quickly, easily.' />
        </Subtitle>
      </div>
    )
  }
}

export default Home
