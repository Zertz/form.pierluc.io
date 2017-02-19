import React, {Component, PropTypes} from 'react'

import FormService from '../FormService'

import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextInput from './TextInput'

class FieldRenderer extends Component {
  getComponent (type) {
    switch (type) {
      case 'email':
      case 'number':
      case 'text':
        return TextInput
      case 'radio':
        return RadioGroup
      case 'select':
        return Select
      case 'checkbox':
        return CheckboxGroup
      default:
        return
    }
  }

  render () {
    const {
      input,
      value,
      disabled,
      onChange,
      onKeyPress
    } = this.props

    const Component = this.getComponent(input.type)

    const style = parseInt(input.order, 10) >= 0 ? {
      order: input.order
    } : {}

    return Component ? (
      <div className='FieldRenderer' style={style}>
        <Component
          input={input}
          value={typeof value !== 'undefined' ? value : FormService.isMultipleValues(input.type) ? [] : ''}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress} />
      </div>
    ) : null
  }
}

FieldRenderer.propTypes = {
  input: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string
  ]),
  focus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default FieldRenderer
