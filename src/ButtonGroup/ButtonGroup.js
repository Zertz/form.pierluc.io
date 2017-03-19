import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import './ButtonGroup.css'

class ButtonGroup extends Component {
  render () {
    const { vertical } = this.props

    return (
      <div className={classnames('ButtonGroup', { vertical })}>{this.props.children}</div>
    )
  }
}

ButtonGroup.propTypes = {
  vertical: PropTypes.bool
}

export default ButtonGroup
