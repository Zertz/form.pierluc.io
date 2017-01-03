import React, {Component} from 'react'

import './Button.css'

class Button extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { onClick } = this.props

    if (onClick) {
      onClick()
    }
  }

  render () {
    return (
      <button className='Button' onClick={this.onClick}>{this.props.text}</button>
    )
  }
}

export default Button
