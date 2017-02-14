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
    const { input, value, focus, onChange, onKeyPress } = this.props

    const Component = this.getComponent(input.type)

    const style = parseInt(input.order, 10) >= 0 ? {
      order: input.order
    } : {}

    return Component ? (
      <div className='FieldRenderer' style={style}>
        <Component
          input={input}
          value={FormService.isMultipleChoices(input.type) ? value.values : value.value}
          focus={focus}
          onChange={onChange}
          onKeyPress={onKeyPress} />
      </div>
    ) : null
  }
}

FieldRenderer.propTypes = {
  input: PropTypes.object.isRequired,
  value: PropTypes.object,
  focus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default FieldRenderer
