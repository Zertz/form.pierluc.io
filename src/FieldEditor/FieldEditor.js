import React, {Component} from 'react'
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl'

import './FieldEditor.css'

import FormService from '../FormService'

import Button from '../Button'
import FieldList from '../FieldList'
import {FieldRenderer} from '../FieldRenderer'
import Subtitle from '../Subtitle'
import Title from '../Title'

const messages = defineMessages({
  type: {
    id: 'FieldEditor.Type',
    defaultMessage: 'Type'
  },
  label: {
    id: 'FieldEditor.Label',
    defaultMessage: 'Label'
  },
  description: {
    id: 'FieldEditor.Description',
    defaultMessage: 'Description'
  },
  help: {
    id: 'FieldEditor.Help',
    defaultMessage: 'Help'
  }
})

class FieldEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: props.input,
      editorFields: {
        type: {
          type: 'select',
          label: props.intl.formatMessage(messages.type),
          choices: FormService.getFieldTypes().map((fieldType) => ({
            label: fieldType,
            value: fieldType
          }))
        },
        label: {
          type: 'text',
          label: props.intl.formatMessage(messages.label)
        },
        description: {
          type: 'text',
          label: props.intl.formatMessage(messages.description)
        },
        help: {
          type: 'text',
          label: props.intl.formatMessage(messages.help)
        }
      }
    }

    this.onAddChoiceClicked = this.onAddChoiceClicked.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onAddChoiceClicked () {
    // TODO
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    const { onFieldChanged, input } = this.props
    const { editorFields } = this.state

    return (
      <div className='FieldEditor'>
        <Title>
          <FormattedMessage id='FieldEditor.Field' defaultMessage='Field' />
        </Title>
        <form className='FieldEditorForm' onSubmit={this.onSubmit}>
          <FieldList fields={editorFields} values={input} onFieldChanged={onFieldChanged} />
        </form>
        {FormService.isMultipleChoices(input.type) ? (
          <div className='FieldEditorChoices'>
            <Subtitle>
              <FormattedMessage id='FieldEditor.Choices' defaultMessage='Choices' />
            </Subtitle>
            <Button onClick={this.onAddChoiceClicked}>
              <FormattedMessage id='FieldEditor.AddChoice' defaultMessage='Add choice' />
            </Button>
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
                <div className='FieldEditorChoice' key={index}>
                  {inputs.map((input, index) => (
                    <FieldRenderer key={index} input={input} onChange={() => {}} />
                  ))}
                </div>
              )
            })}
          </div>
        ) : null}
        <div className='FieldEditorPreview'>
          <FieldRenderer input={input} value={''} disabled onChange={() => {}} />
        </div>
      </div>
    )
  }
}

FieldEditor.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(FieldEditor)
