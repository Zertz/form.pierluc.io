import React, {Component} from 'react'
import classnames from 'classnames'

import './Subtitle.css'

class Subtitle extends Component {
  render () {
    return (
      <h2 className={classnames('Subtitle', this.props.classnames)}>{this.props.children}</h2>
    )
  }
}

export default Subtitle
