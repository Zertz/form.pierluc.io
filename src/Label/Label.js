import React, {Component, PropTypes} from 'react'

import './Label.css'

class Label extends Component {
  render () {
    const { htmlFor } = this.props

    const props = htmlFor ? {
      htmlFor
    } : {}

    return (
      <label className='Label' {...props}>{this.props.children}</label>
    )
  }
}

Label.propTypes = {
  htmlFor: PropTypes.string
}

export default Label
