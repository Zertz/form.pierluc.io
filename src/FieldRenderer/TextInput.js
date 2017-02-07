import React, {Component, PropTypes} from 'react'

import './TextInput.css'

import AppService from '../AppService'

import Label from '../Label'
import Text from '../Text'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId()
    }

    this.setInputRef = this.setInputRef.bind(this)
  }

  componentDidMount () {
    const { focus } = this.props

    if (focus) {
      this.inputRef.focus()
    }
  }

  setInputRef (ref) {
    this.inputRef = ref
  }

  render () {
    const { input, onChange, onKeyPress } = this.props
    const { id } = this.state

    return (
      <div className='TextInput'>
        <input
          id={id}
          ref={this.setInputRef}
          type={input.type}
          value={input.value || ''}
          onChange={onChange}
          onKeyPress={onKeyPress} />
        {input.label && <Label htmlFor={id} content={input.label} />}
        {input.description && <Text classnames='TextInputDescription' content={input.description} />}
        {input.help && <Text classnames='TextInputHelp' content={input.help} />}
      </div>
    )
  }
}

TextInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    help: PropTypes.string
  }),
  onChange: PropTypes.func
}

export default TextInput
