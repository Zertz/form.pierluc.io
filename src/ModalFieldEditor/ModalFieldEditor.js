import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import update from 'immutability-helper'

import './ModalFieldEditor.css'

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

      this.setState({
        field: update(field, {
          [key]: { $set: e.target.value }
        })
      })
    }
  }

  onSaveClicked (e) {
    const { onSave } = this.props
    const { field } = this.state

    this.setState({
      isModalVisible: false
    })

    onSave(e, field)
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
          onFieldChanged={this.onFieldChanged} />
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
