import React, {Component} from 'react'
import classnames from 'classnames'

import './Title.css'

class Title extends Component {
  render () {
    const { content, children } = this.props

    return (
      <h1 className={classnames('Title', this.props.classnames)}>{children || content}</h1>
    )
  }
}

export default Title
