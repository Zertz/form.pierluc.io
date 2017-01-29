import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './ModifyForm.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

import Button from '../Button'
import Dialog from '../Dialog'
import FieldEditor from '../FieldEditor'
import Loading from '../Loading'
import Modal from '../Modal'

const messages = defineMessages({
  addField: {
    id: 'ModifyForm.AddField',
    defaultMessage: 'Add field'
  },
  modify: {
    id: 'ModifyForm.Modify',
    defaultMessage: 'Modify'
  },
  remove: {
    id: 'ModifyForm.Remove',
    defaultMessage: 'Remove'
  },
  confirmRemove: {
    id: 'ModifyForm.ConfirmRemove',
    defaultMessage: 'Are you sure you want to remove this field?'
  },
  save: {
    id: 'ModifyForm.Save',
    defaultMessage: 'Save'
  },
  saving: {
    id: 'ModifyForm.Saving',
    defaultMessage: 'Saving'
  }
})

class ModifyForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isModifyModalShown: false,
      isRemoveDialogShown: false
    }

    this.onFormNameChanged = this.onFormNameChanged.bind(this)
    this.onInputAdded = this.onInputAdded.bind(this)

    this.onModifyClicked = this.onModifyClicked.bind(this)
    this.onModifyModalSaveClicked = this.onModifyModalSaveClicked.bind(this)
    this.onModifyModalCancelClicked = this.onModifyModalCancelClicked.bind(this)
    this.onModifyModalOverlayClicked = this.onModifyModalOverlayClicked.bind(this)

    this.onRemoveClicked = this.onRemoveClicked.bind(this)
    this.onRemoveDialogConfirmClicked = this.onRemoveDialogConfirmClicked.bind(this)
    this.onRemoveDialogCancelClicked = this.onRemoveDialogCancelClicked.bind(this)
    this.onRemoveDialogOverlayClicked = this.onRemoveDialogOverlayClicked.bind(this)

    this.onUpdateClicked = this.onUpdateClicked.bind(this)
  }

  componentDidMount () {
    const { base, routeParams } = this.props

    this.ref = base.bindToState(`forms/${routeParams.form}`, {
      context: this,
      state: 'form',
      then () {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  onFormNameChanged(e) {
    const { form } = this.state

    form.name = e.target.value

    this.setState({ form })
  }

  onInputAdded (input) {
    const { form } = this.state

    form.inputs.push(input)

    this.setState({
      form
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
      const { form } = this.state
      const left = form.inputs.slice(0, index)
      const right = form.inputs.slice(index + 1, form.inputs.length)

      form.inputs = left.concat(right)

      this.setState({
        form,
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

  async onUpdateClicked () {
    const { base, routeParams } = this.props
    const { form } = this.state

    this.setState({
      isSaving: true
    })

    try {
      await FormService.update(base, routeParams.form, form)

      this.setState({
        isSaving: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { intl } = this.props
    const {
      form,
      isLoading,
      isSaving,
      isModifyModalShown,
      isRemoveDialogShown
    } = this.state

    return isLoading ? <Loading /> : (
      <div className='ModifyForm'>
        <div className='ModifyFormHeader'>
          <FieldRenderer input={{ type: 'text', value: form.name || '' }} onChange={this.onFormNameChanged} />
          <Button text={intl.formatMessage(messages['addField'])} />
        </div>
        <ul className='ModifyFormInputList'>
          {form.inputs.map((input, index) =>
            <li className='ModifyFormInputListItem' key={index}>
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
        <Button text={isSaving ? intl.formatMessage(messages['saving']) : intl.formatMessage(messages['save'])} onClick={this.onUpdateClicked} />
      </div>
    )
  }
}

export default injectIntl(ModifyForm)
