import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import './Button.css'

class Button extends Component {
  render () {
    const {
      onClick,
      text,
      classNames,
      cancel,
      submit
    } = this.props

    return submit ? (
      <input type='submit' className={classnames('Button', classNames)} onClick={onClick} value={text} />
    ) : (
      <button className={classnames('Button', {
        cancel: !!cancel
      })} onClick={onClick}>{text}</button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Button
