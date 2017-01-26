import React, {Component} from 'react'
import classnames from 'classnames'

import './Button.css'

class Button extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { onClick } = this.props

    if (typeof onClick === 'function') {
      onClick()
    }
  }

  render () {
    const { submit } = this.props

    return submit ? (
      <input type='submit' className={classnames('Button', this.props.classnames)} onClick={this.onClick} value={this.props.text} />
    ) : (
      <button className={classnames('Button', this.props.classnames)} onClick={this.onClick}>{this.props.text}</button>
    )
  }
}

export default Button
