import React, {Component} from 'react'
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'
import update from 'immutability-helper'

import './Form.css'

import FormService from '../FormService'
import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Dialog from '../Dialog'
import EditableTitle from '../EditableTitle'
import FieldEditor from '../FieldEditor'
import FieldRenderer from '../FieldRenderer'
import Loading from '../Loading'
import Modal from '../Modal'
import Title from '../Title'
import Uploader from '../Uploader'

const messages = defineMessages({
  edit: {
    id: 'Form.Edit',
    defaultMessage: 'Edit'
  },
  remove: {
    id: 'Form.Remove',
    defaultMessage: 'Remove'
  },
  confirmRemove: {
    id: 'Form.ConfirmRemove',
    defaultMessage: 'Are you sure you want to remove this field?'
  },
  save: {
    id: 'Form.Save',
    defaultMessage: 'Save'
  },
  submit: {
    id: 'Form.Submit',
    defaultMessage: 'Submit'
  }
})

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isCoverImageModalShown: undefined,
      isFieldEditorModalShown: undefined,
      isRemoveFieldDialogShown: undefined,
      checkout: PaymentService.initialize({
        checkoutCallback: this.checkoutCallback
      })
    }

    this.isOwner = this.isOwner.bind(this)

    this.onCoverImageUploaded = this.onCoverImageUploaded.bind(this)
    this.onCoverImageClicked = this.onCoverImageClicked.bind(this)
    this.onCoverImageModalSaveClicked = this.onCoverImageModalSaveClicked.bind(this)
    this.onCoverImageModalCancelClicked = this.onCoverImageModalCancelClicked.bind(this)
    this.onCoverImageModalOverlayClicked = this.onCoverImageModalOverlayClicked.bind(this)

    this.onFieldEditorClicked = this.onFieldEditorClicked.bind(this)
    this.onFieldEditorModalSaveClicked = this.onFieldEditorModalSaveClicked.bind(this)
    this.onFieldEditorModalCancelClicked = this.onFieldEditorModalCancelClicked.bind(this)
    this.onFieldEditorModalOverlayClicked = this.onFieldEditorModalOverlayClicked.bind(this)

    this.onRemoveFieldClicked = this.onRemoveFieldClicked.bind(this)
    this.onRemoveFieldDialogConfirmClicked = this.onRemoveFieldDialogConfirmClicked.bind(this)
    this.onRemoveFieldDialogCancelClicked = this.onRemoveFieldDialogCancelClicked.bind(this)
    this.onRemoveFieldDialogOverlayClicked = this.onRemoveFieldDialogOverlayClicked.bind(this)

    this.onTitleSaved = this.onTitleSaved.bind(this)

    this.checkoutCallback = this.checkoutCallback.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount () {
    const { base, routeParams } = this.props

    base.listenTo(`forms/${routeParams.form}`, {
      context: this,
      then (changedForm) {
        const { form } = this.state

        if (form) {
          if (form.name !== changedForm.name) {
            this.setState({
              form: update(form, {
                name: {
                  $set: changedForm.name
                }
              })
            })
          }
        } else {
          this.setState({
            isLoading: false,
            form: changedForm
          })
        }
      }
    })
  }

  isOwner () {
    const { user } = this.props
    const { form } = this.state

    return user && form && form.user === user.uid
  }

  onCoverImageUploaded (coverImage) {
    const { form } = this.state

    this.setState({
      form: update(form, {
        coverImage: { $set: coverImage }
      })
    })
  }

  onCoverImageClicked () {
    this.setState({
      isCoverImageModalShown: true
    })
  }

  onCoverImageModalSaveClicked () {
    this.setState({
      isCoverImageModalShown: false
    })
  }

  onCoverImageModalCancelClicked () {
    this.setState({
      isCoverImageModalShown: false
    })
  }

  onCoverImageModalOverlayClicked () {
    this.setState({
      isCoverImageModalShown: false
    })
  }

  onFieldEditorClicked (key) {
    return (e) => {
      this.setState({
        isFieldEditorModalShown: key
      })

      e.preventDefault()
    }
  }

  onFieldEditorModalSaveClicked (key) {
    return () => {
      this.setState({
        isFieldEditorModalShown: false
      })
    }
  }

  onFieldEditorModalCancelClicked () {
    this.setState({
      isFieldEditorModalShown: false
    })
  }

  onFieldEditorModalOverlayClicked () {
    this.setState({
      isFieldEditorModalShown: false
    })
  }

  onRemoveFieldClicked (key) {
    return (e) => {
      this.setState({
        isRemoveFieldDialogShown: key
      })

      e.preventDefault()
    }
  }

  onRemoveFieldDialogConfirmClicked (key) {
    return () => {
      const { form } = this.state

      this.setState({
        form: update(form, {
          fields: { [key]: { $set: undefined } }
        }),
        isRemoveFieldDialogShown: false
      })
    }
  }

  onRemoveFieldDialogCancelClicked () {
    this.setState({
      isRemoveFieldDialogShown: false
    })
  }

  onRemoveFieldDialogOverlayClicked () {
    this.setState({
      isRemoveFieldDialogShown: false
    })
  }

  onTitleSaved (title) {
    const { base, routeParams } = this.props

    FormService.updateField(base, routeParams.form, 'name', title)
  }

  onInputChanged (index) {
    return (e) => {
      const { inputs } = this.state.form

      if (FormService.isMultipleValues(inputs[index].type)) {
        inputs[index].values = inputs[index].values || []

        const valueIndex = inputs[index].values.indexOf(e.target.value)

        if (valueIndex === -1) {
          inputs[index].values.push(e.target.value)
        } else {
          inputs[index].values.splice(valueIndex, 1)
        }
      } else {
        inputs[index].value = e.target.value
      }

      this.setState({
        form: update(this.state.form, {
          inputs: { $set: inputs }
        })
      })
    }
  }

  async checkoutCallback (token) {
    const { base, routeParams } = this.props
    const { form } = this.state

    try {
      const userToken = await base.auth().currentUser.getToken()
      const stripeToken = token.id
      const formId = routeParams.form

      const response = await PaymentService.charge({
        formId,
        stripeToken,
        userToken
      })

      const charge = await response.json()
      const registration = {
        charge,
        input: form.inputs
      }

      await RegistrationService.create(base, registration)

      browserHistory.push('/me')
    } catch (error) {
      console.error(error)
    }
  }

  onSubmit (e) {
    const { checkout } = this.state

    checkout.open({
      name: 'form.pierluc.io',
      description: 'hello',
      currency: 'cad',
      amount: 2000
    })

    e.preventDefault()
  }

  onSaveClicked (e) {
    e.preventDefault()
  }

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { base, intl } = this.props

    const {
      isLoading,
      isCoverImageModalShown,
      isFieldEditorModalShown,
      isRemoveFieldDialogShown,
      form
    } = this.state

    return isLoading ? <Loading /> : (
      <div className='Form'>
        <div className='FormHeader' style={this.getHeaderStyle(form)}>
          {this.isOwner() ? (
            <Button onClick={this.onCoverImageClicked}>
              {form.coverImage ? (
                <FormattedMessage id='Form.ChangeImage' defaultMessage='Change image' />
              ) : (
                <FormattedMessage id='Form.AddImage' defaultMessage='Add image' />
              )}
            </Button>
          ) : null}
        </div>
        <div className='FormContent'>
          {this.isOwner() ? (
            <EditableTitle onSave={this.onTitleSaved}>{form.name || ''}</EditableTitle>
          ) : form.name ? <Title>{form.name}</Title> : null}
          <form onSubmit={this.onSubmit}>
            {Object.keys(form.fields || {}).map((key) => form.fields[key] ? (
              <FieldRenderer
                key={key}
                input={form.fields[key]}
                edit={this.isOwner()}
                style={{order: form.fields[key].order - Object.keys(form.fields).length}}
                onEditClicked={this.onFieldEditorClicked(key)}
                onRemoveClicked={this.onRemoveFieldClicked(key)}
                onChange={this.onInputChanged(key)} />
            ) : null)}
            <ButtonGroup>
              <Button submit disabled={this.isOwner()} text={intl.formatMessage(messages['submit'])} />
              {this.isOwner() ? (
                <Button onClick={this.onSaveClicked}>
                  <FormattedMessage id='Form.SaveChanges' defaultMessage='Save changes' />
                </Button>
              ) : null}
            </ButtonGroup>
          </form>
        </div>
        {this.isOwner() && typeof isFieldEditorModalShown !== 'undefined' ? (
          <Modal
            isVisible={isFieldEditorModalShown === false ? isFieldEditorModalShown : true}
            content={<FieldEditor input={form.fields[isFieldEditorModalShown]} />}
            actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onFieldEditorModalSaveClicked(isFieldEditorModalShown)} />}
            onCancelClicked={this.onFieldEditorModalCancelClicked}
            onOverlayClicked={this.onFieldEditorModalOverlayClicked} />
        ) : null}
        {this.isOwner() && typeof isRemoveFieldDialogShown !== 'undefined' ? (
          <Dialog
            isVisible={isRemoveFieldDialogShown === false ? isRemoveFieldDialogShown : true}
            content={intl.formatMessage(messages['confirmRemove'])}
            actionButton={<Button text={intl.formatMessage(messages['remove'])} onClick={this.onRemoveFieldDialogConfirmClicked(isRemoveFieldDialogShown)} />}
            onCancelClicked={this.onRemoveFieldDialogCancelClicked}
            onOverlayClicked={this.onRemoveFieldDialogOverlayClicked} />
        ) : null}
        {this.isOwner() && typeof isCoverImageModalShown !== 'undefined' ? (
          <Modal
            isVisible={isCoverImageModalShown}
            content={<Uploader base={base} onFileUploaded={this.onCoverImageUploaded} />}
            actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onCoverImageModalSaveClicked} />}
            onCancelClicked={this.onCoverImageModalCancelClicked}
            onOverlayClicked={this.onCoverImageModalOverlayClicked} />
        ) : null}
      </div>
    )
  }
}

export default injectIntl(Form)
