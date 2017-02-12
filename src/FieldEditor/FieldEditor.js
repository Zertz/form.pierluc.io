import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import update from 'immutability-helper'

import './FieldEditor.css'

import FormService from '../FormService'

import Button from '../Button'
import FieldRenderer from '../FieldRenderer'
import Subtitle from '../Subtitle'
import Title from '../Title'

class FieldEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: props.input,
      editorFields: {
        type: {
          type: 'select',
          label: 'type',
          choices: FormService.getFieldTypes().map((fieldType) => ({
            label: fieldType,
            value: fieldType
          }))
        },
        label: {
          type: 'text',
          label: 'label'
        },
        description: {
          type: 'text',
          label: 'description'
        },
        help: {
          type: 'text',
          label: 'help'
        }
      }
    }

    this.onAddChoiceClicked = this.onAddChoiceClicked.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onAddChoiceClicked () {
    const { input } = this.state

    this.setState({
      input: update(input, {
        choices: { $push: [{}] }
      })
    })
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
          {Object.keys(editorFields).map((key) => (
            <FieldRenderer key={key} input={Object.assign(editorFields[key], { value: input[key] })} onChange={onFieldChanged(key)} />
          ))}
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
          <FieldRenderer input={input} onChange={() => {}} />
        </div>
      </div>
    )
  }
}

export default FieldEditor
