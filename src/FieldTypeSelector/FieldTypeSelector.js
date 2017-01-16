import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './FieldEditor.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

const messages = defineMessages({
  text: {
    id: 'FormService.Text',
    defaultMessage: 'Text'
  },
  email: {
    id: 'FormService.Email',
    defaultMessage: 'Email'
  },
  radio: {
    id: 'FormService.Radio',
    defaultMessage: 'Choice'
  },
  select: {
    id: 'FormService.Select',
    defaultMessage: 'List'
  }
})

class FieldTypeSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: {
        label: '',
        choices: FormService.getFieldTypes()
      }
    }

    this.onFieldTypeChanged = this.onFieldTypeChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onFieldTypeChanged () {
    // Stuff
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    const { intl } = this.props
    const { fieldTypes } = this.state

    return (
      <div className='FieldTypeSelector'>
        <FieldRenderer input={input} />
        <label htmlFor={}></label>
        <select onChange={this.onFieldTypeChanged}>
          {fieldTypes.map((fieldType, index) =>
            <option value='fieldType' key={index}>{intl.formatMessage(messages[fieldType])}</option>
          )}
        </select>
      </div>
    )
  }
}

export default injectIntl(FieldTypeSelector)
