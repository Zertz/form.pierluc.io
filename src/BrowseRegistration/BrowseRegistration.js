import React, {Component} from 'react'

import './BrowseRegistration.css'

class BrowseRegistration extends Component {
  render () {
    const { base, params, user } = this.props

    return (
      <div className='BrowseRegistration'>
        {this.props.children && React.cloneElement(this.props.children, { base, params, user })}
      </div>
    )
  }
}

export default BrowseRegistration
