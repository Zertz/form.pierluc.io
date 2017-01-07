import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl, intlShape} from 'react-intl'

import TextInput from './TextInput'

const messages = defineMessages({
  firstname: {
    id: 'firstname',
    defaultMessage: 'First name'
  },
  lastname: {
    id: 'lastname',
    defaultMessage: 'Last name'
  },
  email: {
    id: 'email',
    defaultMessage: 'Email'
  }
})

class InputRenderer extends Component {
  getComponent (type) {
    switch (type) {
      case 'text':
        return TextInput
      default:
        return TextInput
    }
  }

  render () {
    const { intl, input } = this.props

    const Component = this.getComponent(input.type)

    return (
      <label className='InputRenderer'>
        <span className='InputRendererLabel'>{intl.formatMessage(messages[input.label])}</span>
        <Component {...this.props.input} />
      </label>
    )
  }
}

InputRenderer.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.object.isRequired
}

export default injectIntl(InputRenderer)
