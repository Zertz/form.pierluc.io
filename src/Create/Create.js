import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './Create.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

import Button from '../Button'
import Dialog from '../Dialog'
import FieldEditor from '../FieldEditor'
import Modal from '../Modal'

const messages = defineMessages({
  addField: {
    id: 'Create.AddField',
    defaultMessage: 'Add field'
  },
  modify: {
    id: 'Create.Modify',
    defaultMessage: 'Modify'
  },
  remove: {
    id: 'Create.Remove',
    defaultMessage: 'Remove'
  },
  confirmRemove: {
    id: 'Create.ConfirmRemove',
    defaultMessage: 'Are you sure you want to remove this field?'
  },
  save: {
    id: 'Create.Save',
    defaultMessage: 'Save'
  }
})

class Create extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {},
      inputs: FormService.getDefaultFields(),
      isModifyModalShown: false,
      isRemoveDialogShown: false
    }

    this.onModifyClicked = this.onModifyClicked.bind(this)
    this.onModifyModalSaveClicked = this.onModifyModalSaveClicked.bind(this)
    this.onModifyModalCancelClicked = this.onModifyModalCancelClicked.bind(this)
    this.onModifyModalOverlayClicked = this.onModifyModalOverlayClicked.bind(this)

    this.onRemoveClicked = this.onRemoveClicked.bind(this)
    this.onRemoveDialogConfirmClicked = this.onRemoveDialogConfirmClicked.bind(this)
    this.onRemoveDialogCancelClicked = this.onRemoveDialogCancelClicked.bind(this)
    this.onRemoveDialogOverlayClicked = this.onRemoveDialogOverlayClicked.bind(this)
  }

  async onInputAdded (input) {
    const { base } = this.props

    this.setState({
      inputs: this.state.inputs.push(input)
    })

    try {
      const form = await FormService.create(base, {
        hello: 'world'
      })

      console.info(form)

      this.setState({ form })
    } catch (error) {
      console.error(error)
    }
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
      const left = inputs.slice(0, index);
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

  render () {
    const { intl } = this.props
    const {
      inputs,
      isModifyModalShown,
      isRemoveDialogShown
    } = this.state

    return (
      <div className='Create'>
        <div className='CreateHeader'>
          <Button text={intl.formatMessage(messages['addField'])} />
        </div>
        <ul className='CreateInputList'>
          {inputs.map((input, index) =>
            <li className='CreateInputListItem' key={index}>
              <FieldRenderer input={input} />
              <Button text={intl.formatMessage(messages['modify'])} onClick={this.onModifyClicked(index)} />
              <Button text={intl.formatMessage(messages['remove'])} onClick={this.onRemoveClicked(index)} />
              {isModifyModalShown === index ? (
                <Modal
                  content={<FieldEditor input={input} />}
                  actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onModifyModalSaveClicked(index)} />}
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
        <Button text={intl.formatMessage(messages['save'])} />
      </div>
    )
  }
}

export default injectIntl(Create)
