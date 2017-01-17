import React, {Component} from 'react'
import classnames from 'classnames'

import './Subtitle.css'

class Subtitle extends Component {
  render () {
    const { content } = this.props

    return (
      <h2 className={classnames('Subtitle', this.props.classnames)}>{content}</h2>
    )
  }
}

export default Subtitle
