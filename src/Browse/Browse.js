import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Browse.css'

import Title from '../Title'

class Browse extends Component {
  render () {
    const { base, user } = this.props

    return (
      <div className='Browse'>
        <Title>
          <FormattedMessage id='BrowseForm.Browse' defaultMessage='Browse' />
        </Title>
        {this.props.children && React.cloneElement(this.props.children, { base, user })}
      </div>
    )
  }
}

export default Browse
