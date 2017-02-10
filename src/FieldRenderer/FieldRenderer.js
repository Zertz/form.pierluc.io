import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl, intlShape} from 'react-intl'

import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextInput from './TextInput'

const messages = defineMessages({
  firstname: {
    id: 'FieldRenderer.FirstName',
    defaultMessage: 'First name'
  },
  lastname: {
    id: 'FieldRenderer.LastName',
    defaultMessage: 'Last name'
  },
  email: {
    id: 'FieldRenderer.Email',
    defaultMessage: 'Email'
  },
  plan: {
    id: 'FieldRenderer.Plan',
    defaultMessage: 'Plan'
  },
  color: {
    id: 'FieldRenderer.Color',
    defaultMessage: 'Color'
  },
  animals: {
    id: 'FieldRenderer.Animals',
    defaultMessage: 'Animals'
  }
})

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
      intl,
      input,
      edit,
      focus,
      style,
      onEditClicked,
      onRemoveClicked,
      onChange,
      onKeyPress
    } = this.props

    const Component = this.getComponent(input.type)

    input.value = input.value || ''
    input.label = messages[input.label] ? intl.formatMessage(messages[input.label]) : input.label || ''
    input.description = input.description || ''
    input.help = input.help || ''

    return Component ? (
      <Component
        input={this.props.input}
        edit={edit}
        focus={focus}
        style={style}
        onEditClicked={onEditClicked}
        onRemoveClicked={onRemoveClicked}
        onChange={onChange}
        onKeyPress={onKeyPress} />
    ) : null
  }
}

FieldRenderer.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

export default injectIntl(FieldRenderer)
