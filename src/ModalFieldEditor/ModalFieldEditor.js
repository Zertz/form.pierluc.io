import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl'
import cloneDeep from 'lodash.clonedeep'
import update from 'immutability-helper'

import './ModalFieldEditor.css'

import AppService from '../AppService'
import FormService from '../FormService'

import FieldEditor from '../FieldEditor'
import Modal from '../Modal'

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

class ModalFieldEditor extends Component {
  constructor (props) {
    super(props)

    const fieldTypes = FormService.getFieldTypes()
    const typeChoices = {}

    for (let i = 0; i < fieldTypes.length; i++) {
      typeChoices[fieldTypes[i]] = {
        label: FormService.getFieldTypeLabel(props.intl, fieldTypes[i]),
        order: i
      }
    }

    this.state = {
      isModalVisible: true,
      editedField: Object.assign(cloneDeep(props.field), {
        description: props.field.description || '',
        help: props.field.help || ''
      }),
      editorFields: {
        type: {
          type: 'select',
          label: props.intl.formatMessage(messages.type),
          choices: typeChoices,
          value: props.field.type || ''
        },
        label: {
          type: 'text',
          label: props.intl.formatMessage(messages.label),
          value: props.field.label || ''
        },
        description: {
          type: 'text',
          label: props.intl.formatMessage(messages.description),
          value: props.field.description || ''
        },
        help: {
          type: 'text',
          label: props.intl.formatMessage(messages.help),
          value: props.field.help || ''
        }
      }
    }

    this.onFieldChanged = this.onFieldChanged.bind(this)
    this.onAddChoiceClicked = this.onAddChoiceClicked.bind(this)
    this.onChoiceChanged = this.onChoiceChanged.bind(this)

    this.onSaveClicked = this.onSaveClicked.bind(this)
    this.onCancelClicked = this.onCancelClicked.bind(this)
    this.onOverlayClicked = this.onOverlayClicked.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { isVisible, field } = nextProps

    if (isVisible && field) {
      this.setState({
        isModalVisible: true,
        field
      })
    }
  }

  onFieldChanged (key) {
    return (e) => {
      const { editedField, editorFields } = this.state

      const value = ((field) => {
        // if (FormService.isMultipleChoices(field.type)) {
        //   return {
        //     $set: field.choices[e.target.value].value
        //   }
        // }

        return {
          $set: e.target.value
        }
      })(editorFields[key])

      this.setState({
        editedField: update(editedField, {
          [key]: value,
          choices: editedField.choices ? {
            $set: editedField.choices
          } : {
            $set: {}
          }
        }),
        editorFields: update(editorFields, {
          [key]: { value }
        })
      })
    }
  }

  onAddChoiceClicked () {
    const { editedField } = this.state

    const key = AppService.getRandomId()

    this.setState({
      editedField: update(editedField, {
        choices: {
          [key]: {
            $set: {
              label: '',
              order: Object.keys(editedField.choices).length
            }
          }
        }
      })
    })
  }

  onChoiceChanged (choice) {
    return (key) => {
      return (e) => {
        this.setState({
          editedField: update(this.state.editedField, {
            choices: {
              [choice]: {
                [key]: {
                  $set: key === 'amountCents' ? parseInt(e.target.value, 10) * 100 : e.target.value
                }
              }
            }
          })
        })
      }
    }
  }

  onSaveClicked (e) {
    const { onSave } = this.props
    const { editedField } = this.state

    const $unset = []

    if (!FormService.isMultipleChoices(editedField.type)) {
      $unset.push('choices')
    }

    if (!editedField.description) {
      $unset.push('description')
    }

    if (!editedField.help) {
      $unset.push('help')
    }

    this.setState({
      isModalVisible: false,
      editedField: update(editedField, {
        $unset
      })
    }, () => {
      onSave(e, this.state.editedField)
    })
  }

  onCancelClicked (e) {
    const { onClose } = this.props

    this.setState({
      isModalVisible: false
    })

    onClose(e)
  }

  onOverlayClicked (e) {
    const { onClose } = this.props

    this.setState({
      isModalVisible: false
    })

    onClose(e)
  }

  render () {
    const { field } = this.props
    const { isModalVisible, editedField, editorFields } = this.state

    return typeof field === 'undefined' ? null : (
      <Modal
        isVisible={isModalVisible}
        componentName={'FieldEditor'}
        actionMessage={<FormattedMessage id='ModalFieldEditor.Save' defaultMessage='Save' />}
        onActionClicked={this.onSaveClicked}
        onCancelClicked={this.onCancelClicked}
        onOverlayClicked={this.onOverlayClicked}>
        <FieldEditor
          field={editedField}
          editorFields={editorFields}
          onFieldChanged={this.onFieldChanged}
          onAddChoiceClicked={this.onAddChoiceClicked}
          onChoiceChanged={this.onChoiceChanged} />
      </Modal>
    )
  }
}

ModalFieldEditor.propTypes = {
  intl: intlShape.isRequired,
  field: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default injectIntl(ModalFieldEditor)
