import React, {Component, PropTypes} from 'react'

import './TextInput.css'

import AppService from '../AppService'
import Text from '../Text'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId()
    }
  }

  render () {
    const { input, onChange } = this.props
    const { id } = this.state

    return (
      <div className='TextInput'>
        <input id={id} type={input.type} value={input.value || ''} onChange={onChange} />
        <label htmlFor={id}>{input.label}</label>
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
