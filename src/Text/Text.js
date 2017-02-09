import React, {Component} from 'react'
import classnames from 'classnames'

import './Text.css'

class Text extends Component {
  render () {
    return (
      <p className={classnames('Text', this.props.classnames)}>{this.props.children}</p>
    )
  }
}

export default Text
