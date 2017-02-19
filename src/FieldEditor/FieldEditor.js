import React, {Component, PropTypes} from 'react'
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
  },
  amount: {
    id: 'FieldEditor.Amount',
    defaultMessage: 'Amount'
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
  }

  render () {
    const {
      intl,
      input,
      onFieldChanged,
      onAddChoiceClicked,
      onChoiceChanged
    } = this.props

    const { editorFields } = this.state

    return (
      <div className='FieldEditor'>
        <Title>
          <FormattedMessage id='FieldEditor.Field' defaultMessage='Field' />
        </Title>
        <div className='FieldEditorForm'>
          <FieldList fields={editorFields} values={input} onFieldChanged={onFieldChanged} />
        </div>
        {FormService.isMultipleChoices(input.type) ? (
          <div className='FieldEditorChoices'>
            <Subtitle>
              <FormattedMessage id='FieldEditor.Choices' defaultMessage='Choices' />
            </Subtitle>
            <Button onClick={onAddChoiceClicked}>
              <FormattedMessage id='FieldEditor.AddChoice' defaultMessage='Add choice' />
            </Button>
            {input.choices.map((choice, choiceIndex) => {
              const inputs = [{
                type: 'text',
                label: intl.formatMessage(messages.label),
                value: choice.label
              }, {
                type: 'number',
                label: intl.formatMessage(messages.amount),
                value: choice.amount
              }]

              return (
                <div className='FieldEditorChoice' key={choiceIndex}>
                  {inputs.map((input, inputIndex) => (
                    <FieldRenderer key={inputIndex} input={input} value={input.value} onChange={onChoiceChanged(choiceIndex, input)} />
                  ))}
                </div>
              )
            })}
          </div>
        ) : null}
        <Subtitle>
          <FormattedMessage id='FieldEditor.Preview' defaultMessage='Preview' />
        </Subtitle>
        <div className='FieldEditorPreview'>
          <FieldRenderer input={input} value={FormService.isMultipleValues(input.type) ? [] : ''} disabled onChange={() => {}} />
        </div>
      </div>
    )
  }
}

FieldEditor.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.object.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
  onAddChoiceClicked: PropTypes.func.isRequired,
  onChoiceChanged: PropTypes.func.isRequired
}

export default injectIntl(FieldEditor)
