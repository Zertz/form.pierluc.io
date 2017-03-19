import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import './Button.css'

class Button extends Component {
  render () {
    const {
      onClick,
      className,
      disabled,
      small,
      cancel,
      submit
    } = this.props

    return (
      <button type={submit ? 'submit' : 'button'} className={classnames('Button', className, {
        small: !!small,
        cancel: !!cancel
      })} disabled={disabled} onClick={onClick}>{this.props.children}</button>
    )
  }
}

Button.propTypes = {
  onClick: (props, propName, componentName) => {
    if (typeof props[propName] !== 'function' && (typeof props[propName] !== 'undefined' && props.submit)) {
      return new Error(`Failed prop type: The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`)
    }
  },
  className: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  cancel: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  submit: PropTypes.bool
}

export default Button
