import React, {Component, PropTypes} from 'react'

import './Label.css'

class Label extends Component {
  render () {
    const { htmlFor, content } = this.props

    const props = htmlFor ? {
      htmlFor
    } : {}

    return (
      <label className='Label' {...props}>{content || this.props.children}</label>
    )
  }
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  content: PropTypes.string
}

export default Label
