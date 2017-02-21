import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import isPlainObject from 'lodash.isplainobject'
import update from 'immutability-helper'

import './ModalFieldEditor.css'

import AppService from '../AppService'
import FormService from '../FormService'

import FieldEditor from '../FieldEditor'
import Modal from '../Modal'

class ModalFieldEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isModalVisible: true,
      field: props.field
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
      const { field } = this.state

      const fieldUpdate = {
        [key]: { $set: e.target.value }
      }

      if (key === 'type' && FormService.isMultipleChoices(e.target.value) && !isPlainObject(field.choices)) {
        fieldUpdate.choices = { $set: {} }
      }

      this.setState({
        field: update(field, fieldUpdate)
      })
    }
  }

  onAddChoiceClicked () {
    const { field } = this.state
    const key = AppService.getRandomId()

    this.setState({
      field: update(field, {
        choices: {
          [key]: {
            $set: {
              label: ''
            }
          }
        }
      })
    })
  }

  onChoiceChanged (key, input) {
    return (e) => {
      const { field } = this.state

      const value = input.key === 'amountCents'
        ? parseInt(e.target.value, 10) * 100
        : input.type === 'number'
        ? parseInt(e.target.value, 10)
        : e.target.value

      this.setState({
        field: update(field, {
          choices: {
            [key]: {
              [input.key]: {
                $set: value
              }
            }
          }
        })
      })
    }
  }

  onSaveClicked (e) {
    const { onSave } = this.props
    const { field } = this.state

    const $unset = []

    if (!FormService.isMultipleChoices(field.type)) {
      $unset.push('choices')
    }

    if (!field.description) {
      $unset.push('description')
    }

    if (!field.help) {
      $unset.push('help')
    }

    this.setState({
      isModalVisible: false,
      field: update(field, {
        $unset
      })
    }, () => {
      onSave(e, this.state.field)
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
    const { isModalVisible, field } = this.state

    return typeof field === 'undefined' ? null : (
      <Modal
        isVisible={isModalVisible}
        componentName={'FieldEditor'}
        actionMessage={<FormattedMessage id='ModalFieldEditor.Save' defaultMessage='Save' />}
        onActionClicked={this.onSaveClicked}
        onCancelClicked={this.onCancelClicked}
        onOverlayClicked={this.onOverlayClicked}>
        <FieldEditor
          input={field}
          onFieldChanged={this.onFieldChanged}
          onAddChoiceClicked={this.onAddChoiceClicked}
          onChoiceChanged={this.onChoiceChanged} />
      </Modal>
    )
  }
}

ModalFieldEditor.propTypes = {
  field: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ModalFieldEditor
