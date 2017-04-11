import React, {Component, PropTypes} from 'react'

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
    }
  }

  render () {
    const {
      field,
      focus,
      disabled,
      onChange,
      onKeyPress
    } = this.props

    const Component = this.getComponent(field.type)

    const style = parseInt(field.order, 10) >= 0 ? {
      order: field.order
    } : {}

    return Component ? (
      <div className='FieldRenderer' style={style}>
        <Component
          field={field}
          focus={focus}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress} />
      </div>
    ) : null
  }
}

FieldRenderer.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.object,
    description: PropTypes.string,
    help: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.string
    ])
  }),
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default FieldRenderer
