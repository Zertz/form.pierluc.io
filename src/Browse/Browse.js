import React, {Component} from 'react'

import './Browse.css'

class Browse extends Component {
  render () {
    const { base, user } = this.props

    return (
      <div className='Browse'>
        {this.props.children && React.cloneElement(this.props.children, { base, user })}
      </div>
    )
  }
}

export default Browse
