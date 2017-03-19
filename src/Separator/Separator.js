import React, {Component} from 'react'

import './Separator.css'

class Separator extends Component {
  render () {
    return (
      <div className='Separator'>{this.props.children}</div>
    )
  }
}

export default Separator
