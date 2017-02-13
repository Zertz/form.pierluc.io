import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import './Button.css'

class Button extends Component {
  render () {
    const {
      onClick,
      children,
      disabled,
      small,
      cancel,
      submit
    } = this.props

    return (
      <button type={submit ? 'submit' : 'button'} className={classnames('Button', {
        small: !!small,
        cancel: !!cancel
      })} disabled={disabled} onClick={onClick}>{children}</button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
}

export default Button
