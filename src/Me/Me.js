import React, {Component} from 'react'

import './Me.css'

class Me extends Component {
  render () {
    const { base, user } = this.props

    return (
      <div className='Me'>
        {this.props.children && React.cloneElement(this.props.children, { base, user })}
      </div>
    )
  }
}

export default Me
