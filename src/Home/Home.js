import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Home.css'

import Title from '../Title'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <Title content={<FormattedMessage id='Home.CraftFantasticForms' defaultMessage='Craft fantastic forms.' />} />
      </div>
    )
  }
}

export default Home
