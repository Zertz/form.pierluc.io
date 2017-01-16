import React, {Component, PropTypes} from 'react'

import './TextInput.css'

import AppService from '../AppService'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId()
    }
  }

  render () {
    const { input } = this.props
    const { id } = this.state

    return (
      <div className='TextInput'>
        <input id={id} {...input} />
        <label htmlFor={id}>{input.label}</label>
      </div>
    )
  }
}

TextInput.propTypes = {
  input: PropTypes.shape({
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
}

export default TextInput
