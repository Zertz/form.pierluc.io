import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <div className='HomeTitle Title'>
          <FormattedMessage id='Home.CraftFantasticForms' defaultMessage='Craft fantastic forms.' />
        </div>
      </div>
    )
  }
}

export default Home
