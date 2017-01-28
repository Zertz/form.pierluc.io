import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './FieldEditor.css'

import FormService from '../FormService'

import FieldRenderer from '../FieldRenderer'
import Subtitle from '../Subtitle'
import Title from '../Title'

const messages = defineMessages({
  field: {
    id: 'FieldEditor.Field',
    defaultMessage: 'Field'
  },
  choices: {
    id: 'FieldEditor.Choices',
    defaultMessage: 'Choices'
  }
})

class FieldEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: props.input,
      editorInputs: [{
        type: 'select',
        label: 'type',
        value: props.input.type,
        choices: FormService.getFieldTypes().map((fieldType) => ({
          label: fieldType,
          value: fieldType
        }))
      }, {
        type: 'text',
        label: 'label',
        value: props.input.label
      }, {
        type: 'text',
        label: 'description',
        value: props.input.description
      }, {
        type: 'text',
        label: 'help',
        value: props.input.help
      }]
    }

    this.onFieldChanged = this.onFieldChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onFieldChanged (index) {
    return (e) => {
      const { input, editorInputs } = this.state

      editorInputs[index].value = e.target.value

      this.setState({
        input: Object.assign(input, {
          [editorInputs[index].label]: e.target.value
        }),
        editorInputs
      })
    }
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    const { intl } = this.props
    const { input, editorInputs } = this.state

    return (
      <div className='FieldEditor'>
        <Title content={intl.formatMessage(messages['field'])} />
        <form className='FieldEditorForm' onSubmit={this.onSubmit}>
          {editorInputs.map((editorInput, index) => (
            <FieldRenderer key={index} input={editorInput} onChange={this.onFieldChanged(index)} />
          ))}
        </form>
        <div className='FieldEditorChoices'>
          <Subtitle content={intl.formatMessage(messages['choices'])} />
          {(input.choices || []).map((choice, index) => {
            const inputs = [{
              type: 'text',
              label: 'label',
              value: choice.label
            }, {
              type: 'number',
              label: 'amount',
              value: choice.amount
            }]

            return (
              <div className="FieldEditorChoice" key={index}>
                {inputs.map((input, index) => (
                  <FieldRenderer key={index} input={input} onChange={() => {}} />
                ))}
              </div>
            )
          })}
        </div>
        <div className='FieldEditorPreview'>
          <FieldRenderer input={input} onChange={() => {}} />
        </div>
      </div>
    )
  }
}

export default injectIntl(FieldEditor)
