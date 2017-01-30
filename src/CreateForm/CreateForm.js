import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import {browserHistory} from 'react-router'

import './CreateForm.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

import Button from '../Button'
import Dialog from '../Dialog'
import FieldEditor from '../FieldEditor'
import Modal from '../Modal'

const messages = defineMessages({
  addField: {
    id: 'CreateForm.AddField',
    defaultMessage: 'Add field'
  },
  modify: {
    id: 'CreateForm.Modify',
    defaultMessage: 'Modify'
  },
  remove: {
    id: 'CreateForm.Remove',
    defaultMessage: 'Remove'
  },
  confirmRemove: {
    id: 'CreateForm.ConfirmRemove',
    defaultMessage: 'Are you sure you want to remove this field?'
  },
  save: {
    id: 'CreateForm.Save',
    defaultMessage: 'Save'
  }
})

class CreateForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: null,
      inputs: FormService.getDefaultFields(),
      isAddModalShown: false,
      isModifyModalShown: false,
      isRemoveDialogShown: false
    }

    this.onAddClicked = this.onAddClicked.bind(this)
    this.onAddModalSaveClicked = this.onAddModalSaveClicked.bind(this)
    this.onAddModalCancelClicked = this.onAddModalCancelClicked.bind(this)
    this.onAddModalOverlayClicked = this.onAddModalOverlayClicked.bind(this)

    this.onModifyClicked = this.onModifyClicked.bind(this)
    this.onModifyModalSaveClicked = this.onModifyModalSaveClicked.bind(this)
    this.onModifyModalCancelClicked = this.onModifyModalCancelClicked.bind(this)
    this.onModifyModalOverlayClicked = this.onModifyModalOverlayClicked.bind(this)

    this.onRemoveClicked = this.onRemoveClicked.bind(this)
    this.onRemoveDialogConfirmClicked = this.onRemoveDialogConfirmClicked.bind(this)
    this.onRemoveDialogCancelClicked = this.onRemoveDialogCancelClicked.bind(this)
    this.onRemoveDialogOverlayClicked = this.onRemoveDialogOverlayClicked.bind(this)

    this.onCreateClicked = this.onCreateClicked.bind(this)
  }

  onAddClicked () {
    this.setState({
      isAddModalShown: true
    })
  }

  onAddModalSaveClicked (input) {
    const { inputs } = this.state

    this.setState({
      inputs: inputs.push(input)
    })
  }

  onAddModalCancelClicked () {
    this.setState({
      isAddModalShown: false
    })
  }

  onAddModalOverlayClicked () {
    this.setState({
      isAddModalShown: false
    })
  }

  onModifyClicked (index) {
    return () => {
      this.setState({
        isModifyModalShown: index
      })
    }
  }

  onModifyModalSaveClicked (index) {
    return () => {
      this.setState({
        isModifyModalShown: false
      })
    }
  }

  onModifyModalCancelClicked () {
    this.setState({
      isModifyModalShown: false
    })
  }

  onModifyModalOverlayClicked () {
    this.setState({
      isModifyModalShown: false
    })
  }

  onRemoveClicked (index) {
    return () => {
      this.setState({
        isRemoveDialogShown: index
      })
    }
  }

  onRemoveDialogConfirmClicked (index) {
    return () => {
      const { inputs } = this.state
      const left = inputs.slice(0, index)
      const right = inputs.slice(index + 1, inputs.length)

      this.setState({
        inputs: left.concat(right),
        isRemoveDialogShown: false
      })
    }
  }

  onRemoveDialogCancelClicked () {
    this.setState({
      isRemoveDialogShown: false
    })
  }

  onRemoveDialogOverlayClicked () {
    this.setState({
      isRemoveDialogShown: false
    })
  }

  async onCreateClicked (input) {
    const { base } = this.props
    const { inputs } = this.state

    try {
      const formId = await FormService.create(base, {
        inputs
      })

      browserHistory.push(`/me/${formId}`)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { intl } = this.props
    const {
      inputs,
      isAddModalShown,
      isModifyModalShown,
      isRemoveDialogShown
    } = this.state

    return (
      <div className='CreateForm'>
        <div className='CreateFormHeader'>
          <Button text={intl.formatMessage(messages['addField'])} onClick={this.onAddClicked} />
          {isAddModalShown ? (
            <Modal
              content={<FieldEditor input={{ type: 'text' }} />}
              actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onAddModalSaveClicked} />}
              onCancelClicked={this.onAddModalCancelClicked}
              onOverlayClicked={this.onAddModalOverlayClicked} />
          ) : null}
        </div>
        <ul className='CreateFormInputList'>
          {inputs.map((input, index) =>
            <li className='CreateFormInputListItem' key={index}>
              <FieldRenderer input={input} onChange={() => {}} />
              <Button text={intl.formatMessage(messages['modify'])} onClick={this.onModifyClicked(index)} />
              <Button text={intl.formatMessage(messages['remove'])} onClick={this.onRemoveClicked(index)} />
              {isModifyModalShown === index ? (
                <Modal
                  content={<FieldEditor input={input} />}
                  actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onModifyModalSaveClicked(index)} />}
                  onCancelClicked={this.onModifyModalCancelClicked}
                  onOverlayClicked={this.onModifyModalOverlayClicked} />
              ) : null}
              {isRemoveDialogShown === index ? (
                <Dialog
                  content={intl.formatMessage(messages['confirmRemove'])}
                  actionButton={<Button text={intl.formatMessage(messages['remove'])} onClick={this.onRemoveDialogConfirmClicked(index)} />}
                  onCancelClicked={this.onRemoveDialogCancelClicked}
                  onOverlayClicked={this.onRemoveDialogOverlayClicked} />
              ) : null}
            </li>
          )}
        </ul>
        <Button text={intl.formatMessage(messages['save'])} onClick={this.onCreateClicked} />
      </div>
    )
  }
}

export default injectIntl(CreateForm)
