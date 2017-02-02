import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import {browserHistory} from 'react-router'
import update from 'immutability-helper'

import './CreateForm.css'

import FormService from '../FormService'
import FieldRenderer from '../FieldRenderer'

import Button from '../Button'
import Dialog from '../Dialog'
import FieldEditor from '../FieldEditor'
import Loading from '../Loading'
import Modal from '../Modal'
import Uploader from '../Uploader'

const messages = defineMessages({
  addField: {
    id: 'CreateForm.AddField',
    defaultMessage: 'Add field'
  },
  addCoverImage: {
    id: 'CreateForm.AddCoverImage',
    defaultMessage: 'Add cover image'
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
  },
  saving: {
    id: 'CreateForm.Saving',
    defaultMessage: 'Saving'
  }
})

class CreateForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      form: null,
      isAddFieldModalShown: false,
      isAddCoverImageModalShown: false,
      isModifyModalShown: false,
      isRemoveDialogShown: false
    }

    this.onFormNameChanged = this.onFormNameChanged.bind(this)

    this.onAddFieldClicked = this.onAddFieldClicked.bind(this)
    this.onAddFieldModalSaveClicked = this.onAddFieldModalSaveClicked.bind(this)
    this.onAddFieldModalCancelClicked = this.onAddFieldModalCancelClicked.bind(this)
    this.onAddFieldModalOverlayClicked = this.onAddFieldModalOverlayClicked.bind(this)

    this.onCoverImageUploaded = this.onCoverImageUploaded.bind(this)
    this.onAddCoverImageClicked = this.onAddCoverImageClicked.bind(this)
    this.onAddCoverImageModalSaveClicked = this.onAddCoverImageModalSaveClicked.bind(this)
    this.onAddCoverImageModalCancelClicked = this.onAddCoverImageModalCancelClicked.bind(this)
    this.onAddCoverImageModalOverlayClicked = this.onAddCoverImageModalOverlayClicked.bind(this)

    this.onModifyClicked = this.onModifyClicked.bind(this)
    this.onModifyModalSaveClicked = this.onModifyModalSaveClicked.bind(this)
    this.onModifyModalCancelClicked = this.onModifyModalCancelClicked.bind(this)
    this.onModifyModalOverlayClicked = this.onModifyModalOverlayClicked.bind(this)

    this.onRemoveClicked = this.onRemoveClicked.bind(this)
    this.onRemoveDialogConfirmClicked = this.onRemoveDialogConfirmClicked.bind(this)
    this.onRemoveDialogCancelClicked = this.onRemoveDialogCancelClicked.bind(this)
    this.onRemoveDialogOverlayClicked = this.onRemoveDialogOverlayClicked.bind(this)

    this.onSubmit = this.onSubmit.bind(this)
    this.onCreateClicked = this.onCreateClicked.bind(this)
    this.onUpdateClicked = this.onUpdateClicked.bind(this)
  }

  componentDidMount () {
    const { base, routeParams } = this.props

    if (routeParams.form) {
      this.ref = base.bindToState(`forms/${routeParams.form}`, {
        context: this,
        state: 'form',
        then () {
          this.setState({
            isLoading: false
          })
        }
      })
    } else {
      this.setState({
        isLoading: false,
        form: {
          name: '',
          coverImage: '',
          inputs: FormService.getDefaultFields()
        }
      })
    }
  }

  onFormNameChanged (e) {
    const { form } = this.state

    form.name = e.target.value

    this.setState({ form })
  }

  onAddFieldClicked () {
    this.setState({
      isAddFieldModalShown: true
    })
  }

  onAddFieldModalSaveClicked (input) {
    const { form } = this.state

    this.setState({
      form: update(form, {
        inputs: { $push: [input] }
      })
    })
  }

  onAddFieldModalCancelClicked () {
    this.setState({
      isAddFieldModalShown: false
    })
  }

  onAddFieldModalOverlayClicked () {
    this.setState({
      isAddFieldModalShown: false
    })
  }

  onCoverImageUploaded (coverImage) {
    const { form } = this.state

    this.setState({
      form: update(form, {
        coverImage: { $set: coverImage }
      })
    })
  }

  onAddCoverImageClicked () {
    this.setState({
      isAddCoverImageModalShown: true
    })
  }

  onAddCoverImageModalSaveClicked () {
    this.setState({
      isAddCoverImageModalShown: false
    })
  }

  onAddCoverImageModalCancelClicked () {
    this.setState({
      isAddCoverImageModalShown: false
    })
  }

  onAddCoverImageModalOverlayClicked () {
    this.setState({
      isAddCoverImageModalShown: false
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

      this.setState({
        form: update(form, {
          inputs: { $set: left.concat(right) }
        }),
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

  onSubmit (e) {
    const { routeParams } = this.props

    e.preventDefault()

    this.setState({
      isSaving: true
    })

    if (routeParams.form) {
      this.onUpdateClicked(e)
    } else {
      this.onCreateClicked(e)
    }
  }

  async onCreateClicked (e) {
    const { base } = this.props
    const { form } = this.state

    try {
      const formId = await FormService.create(base, form)

      browserHistory.push(`/browse/${formId}`)
    } catch (error) {
      console.error(error)
    }
  }

  async onUpdateClicked (e) {
    const { base, routeParams } = this.props
    const { form } = this.state

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
    const { intl, base } = this.props
    const {
      form,
      isLoading,
      isSaving,
      isAddFieldModalShown,
      isAddCoverImageModalShown,
      isModifyModalShown,
      isRemoveDialogShown
    } = this.state

    return isLoading ? <Loading /> : (
      <form className='CreateForm' onSubmit={this.onSubmit}>
        <div className='CreateFormHeader'>
          <FieldRenderer input={{ type: 'text', value: form.name || '' }} onChange={this.onFormNameChanged} />
          <Button text={intl.formatMessage(messages['addField'])} onClick={this.onAddFieldClicked} />
          {isAddFieldModalShown ? (
            <Modal
              content={<FieldEditor input={{ type: 'text' }} />}
              actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onAddFieldModalSaveClicked} />}
              onCancelClicked={this.onAddFieldModalCancelClicked}
              onOverlayClicked={this.onAddFieldModalOverlayClicked} />
          ) : null}
          <Button text={intl.formatMessage(messages['addCoverImage'])} onClick={this.onAddCoverImageClicked} />
          {isAddCoverImageModalShown ? (
            <Modal
              content={<Uploader base={base} onFileUploaded={this.onCoverImageUploaded} />}
              actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onAddCoverImageModalSaveClicked} />}
              onCancelClicked={this.onAddCoverImageModalCancelClicked}
              onOverlayClicked={this.onAddCoverImageModalOverlayClicked} />
          ) : null}
        </div>
        <ul className='CreateFormInputList'>
          {form.inputs.map((input, index) =>
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
        <Button submit text={isSaving ? intl.formatMessage(messages['saving']) : intl.formatMessage(messages['save'])} />
      </form>
    )
  }
}

export default injectIntl(CreateForm)
