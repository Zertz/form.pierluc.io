import React, {Component} from 'react'
import classnames from 'classnames'

import './Text.css'

class Text extends Component {
  render () {
    const { content } = this.props

    return (
      <p className={classnames('Text', this.props.classnames)}>{content}</p>
    )
  }
}

export default Text
