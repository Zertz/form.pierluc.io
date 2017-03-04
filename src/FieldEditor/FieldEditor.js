import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './FieldEditor.css'

import FormService from '../FormService'

import Button from '../Button'
import DraggableFieldChoice from '../DraggableFieldChoice'
import FieldList from '../FieldList'
import {FieldRenderer} from '../FieldRenderer'
import Subtitle from '../Subtitle'
import Title from '../Title'

class FieldEditor extends Component {
  render () {
    const {
      field,
      editorFields,
      onFieldChanged,
      onAddChoiceClicked,
      onChoiceChanged
    } = this.props

    const orderedChoices = FormService.getOrderedChoices(field.choices)

    return (
      <div className='FieldEditor'>
        <Title>
          <FormattedMessage id='FieldEditor.Field' defaultMessage='Field' />
        </Title>
        <div className='FieldEditorForm'>
          <FieldList fields={editorFields} onFieldChanged={onFieldChanged} />
        </div>
        {FormService.isMultipleChoices(field.type) ? (
          <div className='FieldEditorChoices'>
            <Subtitle>
              <FormattedMessage id='FieldEditor.Choices' defaultMessage='Choices' />
            </Subtitle>
            <Button small onClick={onAddChoiceClicked}>
              <FormattedMessage id='FieldEditor.AddChoice' defaultMessage='Add choice' />
            </Button>
            <div className='FieldEditorChoicesList'>
              {orderedChoices.map((key) => (
                <div className='FieldEditorChoicesListItem' key={key}>
                  <DraggableFieldChoice choice={field.choices[key]} onChange={onChoiceChanged(key)} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <Subtitle>
          <FormattedMessage id='FieldEditor.Preview' defaultMessage='Preview' />
        </Subtitle>
        <div className='FieldEditorPreview'>
          <FieldRenderer field={field} disabled onChange={() => {}} />
        </div>
      </div>
    )
  }
}

FieldEditor.propTypes = {
  field: PropTypes.object.isRequired,
  editorFields: PropTypes.object.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
  onAddChoiceClicked: PropTypes.func.isRequired,
  onChoiceChanged: PropTypes.func.isRequired
}

export default FieldEditor
