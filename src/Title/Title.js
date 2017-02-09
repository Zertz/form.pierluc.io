import React, {Component} from 'react'
import classnames from 'classnames'

import './Title.css'

class Title extends Component {
  render () {
    return (
      <h1 className={classnames('Title', this.props.classnames)}>{this.props.children}</h1>
    )
  }
}

export default Title
