import React, {Component} from 'react'
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'
import update from 'immutability-helper'

import './Form.css'

import AppService from '../AppService'
import FormService from '../FormService'
import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Dialog from '../Dialog'
import EditableTitle from '../EditableTitle'
import FieldRenderer from '../FieldRenderer'
import Loading from '../Loading'
import Modal from '../Modal'
import ModalFieldEditor from '../ModalFieldEditor'
import Text from '../Text'
import Title from '../Title'
import Uploader from '../Uploader'

const messages = defineMessages({
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
      isAddingField: undefined,
      isFieldEditorModalVisible: undefined,
      isEditingField: undefined,
      isRemovingField: undefined,
      isUploadingCoverImage: undefined,
      checkout: PaymentService.initialize({
        checkoutCallback: this.checkoutCallback
      })
    }

    this.isOwner = this.isOwner.bind(this)
    this.isOwnerAsGuest = this.isOwnerAsGuest.bind(this)

    this.onToggleGuestClicked = this.onToggleGuestClicked.bind(this)

    this.onCoverImageClicked = this.onCoverImageClicked.bind(this)
    this.onCoverImageUploaded = this.onCoverImageUploaded.bind(this)
    this.onCoverImageModalSaveClicked = this.onCoverImageModalSaveClicked.bind(this)
    this.onCoverImageModalCancelClicked = this.onCoverImageModalCancelClicked.bind(this)
    this.onCoverImageModalOverlayClicked = this.onCoverImageModalOverlayClicked.bind(this)

    this.onAddFieldClicked = this.onAddFieldClicked.bind(this)

    this.onEditFieldClicked = this.onEditFieldClicked.bind(this)
    this.onModalFieldEditorSave = this.onModalFieldEditorSave.bind(this)
    this.onModalFieldEditorClose = this.onModalFieldEditorClose.bind(this)

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

    this.ref = base.listenTo(`forms/${routeParams.form}`, {
      context: this,
      then (form) {
        if (this.state.form) {
          this.setState({
            isLoading: false,
            isAddingField: false,
            isRemovingField: false,
            isFieldEditorModalVisible: false,
            isUploadingCoverImage: false,
            form
          })
        } else {
          this.setState({
            isLoading: false,
            form
          })
        }
      },
      onFailure (error) {
        console.error(error)
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      isAddingField,
      isEditingField
    } = this.state

    if (isAddingField && isAddingField !== isEditingField) {
      this.setState({
        isEditingField: isAddingField
      })
    }
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  isOwner () {
    const { user } = this.props
    const { form, isGuest } = this.state

    return user && form && form.user === user.uid && !isGuest
  }

  isOwnerAsGuest () {
    const { user } = this.props
    const { form, isGuest } = this.state

    return user && form && form.user === user.uid && isGuest
  }

  onToggleGuestClicked () {
    this.setState({
      isGuest: !this.state.isGuest
    })
  }

  onCoverImageClicked () {
    this.setState({
      isUploadingCoverImage: true
    })
  }

  onCoverImageUploaded (coverImage) {
    this.setState({
      isUploadingCoverImage: coverImage
    })
  }

  async onCoverImageModalSaveClicked () {
    const { base, routeParams } = this.props
    const { isUploadingCoverImage, form } = this.state

    if (form.coverImage === isUploadingCoverImage) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      if (isUploadingCoverImage) {
        await base.database().ref().update({
          [`forms/${routeParams.form}/coverImage`]: isUploadingCoverImage
        })
      } else {
        await base.database().ref(`forms/${routeParams.form}/coverImage`).remove()
      }
    } catch (error) {
      console.error(error)
    }
  }

  onCoverImageModalCancelClicked () {
    this.setState({
      isUploadingCoverImage: false
    })
  }

  onCoverImageModalOverlayClicked () {
    this.setState({
      isUploadingCoverImage: false
    })
  }

  onAddFieldClicked () {
    const { form } = this.state
    const key = AppService.getRandomId()

    this.setState({
      isAddingField: key,
      form: update(form, {
        fields: {
          [key]: {
            $set: {
              type: 'text',
              order: Object.keys(form.fields).length
            }
          }
        }
      })
    }, () => {
      this.onEditFieldClicked(key)()
    })
  }

  onEditFieldClicked (key) {
    return () => {
      this.setState({
        isFieldEditorModalVisible: true,
        isEditingField: key
      })
    }
  }

  async onModalFieldEditorSave (e, field) {
    const { base, routeParams } = this.props
    const { isEditingField, form } = this.state

    if (form.fields[isEditingField] === field) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      await base.database().ref().update({
        [`forms/${routeParams.form}/fields/${isEditingField}`]: field
      })
    } catch (error) {
      console.error(error)
    }
  }

  onModalFieldEditorClose () {
    const { form, isAddingField } = this.state

    if (isAddingField) {
      this.setState({
        form: update(form, {
          fields: { $unset: [isAddingField] }
        }),
        isAddingField: false,
        isFieldEditorModalVisible: false
      })
    } else {
      this.setState({
        isFieldEditorModalVisible: false
      })
    }
  }

  onRemoveFieldClicked (key) {
    return (e) => {
      this.setState({
        isRemovingField: key
      })
    }
  }

  onRemoveFieldDialogConfirmClicked (key) {
    return async () => {
      const { base, routeParams } = this.props
      const { form } = this.state

      this.setState({
        isLoading: true
      })

      try {
        await base.database().ref(`forms/${routeParams.form}/fields/${key}`).remove()
      } catch (error) {
        console.error(error)
      }

      this.setState({
        form: update(form, {
          fields: { $unset: [key] }
        }),
        isRemovingField: false
      })
    }
  }

  onRemoveFieldDialogCancelClicked () {
    this.setState({
      isRemovingField: false
    })
  }

  onRemoveFieldDialogOverlayClicked () {
    this.setState({
      isRemovingField: false
    })
  }

  async onTitleSaved (title) {
    const { base, routeParams } = this.props
    const { form } = this.state

    if (form.title === title) {
      return
    }

    this.setState({
      isLoading: true
    })

    try {
      await base.database().ref().update({
        [`forms/${routeParams.form}/title`]: title
      })
    } catch (error) {
      console.error(error)
    }
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
    e.preventDefault()

    if (this.isOwner() || this.isOwnerAsGuest()) {
      return
    }

    const { checkout } = this.state

    checkout.open({
      name: 'form.pierluc.io',
      description: 'hello',
      currency: 'cad',
      amount: 2000
    })
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
      isUploadingCoverImage,
      isFieldEditorModalVisible,
      isEditingField,
      isRemovingField,
      form
    } = this.state

    return isLoading ? <Loading /> : (
      <div className='Form'>
        <div className='FormHeader' style={this.getHeaderStyle(form)}>
          {this.isOwner() ? (
            <ButtonGroup>
              <Button onClick={this.onCoverImageClicked}>
                {form.coverImage ? (
                  <FormattedMessage id='Form.ChangeImage' defaultMessage='Change image' />
                ) : (
                  <FormattedMessage id='Form.AddImage' defaultMessage='Add image' />
                )}
              </Button>
              <Button onClick={this.onToggleGuestClicked}>
                <FormattedMessage id='Form.ViewAsGuest' defaultMessage='View as guest' />
              </Button>
            </ButtonGroup>
          ) : null}
          {this.isOwnerAsGuest() ? (
            <Button onClick={this.onToggleGuestClicked}>
              <FormattedMessage id='Form.ViewAsMyself' defaultMessage='Return to editing' />
            </Button>
          ) : null}
        </div>
        <div className='FormContent'>
          {this.isOwner() ? (
            <EditableTitle onSave={this.onTitleSaved}>{form.title || ''}</EditableTitle>
          ) : form.title ? <Title>{form.title}</Title> : null}
          {this.isOwner() ? (
            <Button onClick={this.onAddFieldClicked}>
              <FormattedMessage id='Form.AddField' defaultMessage='Add field' />
            </Button>
          ) : null}
          <form onSubmit={this.onSubmit}>
            {Object.keys(form.fields || {}).map((key) => form.fields[key] ? (
              <FieldRenderer
                key={key}
                input={form.fields[key]}
                edit={this.isOwner()}
                style={{order: form.fields[key].order - Object.keys(form.fields).length}}
                onEditClicked={this.onEditFieldClicked(key)}
                onRemoveClicked={this.onRemoveFieldClicked(key)}
                onChange={this.onInputChanged(key)} />
            ) : null)}
            <Button submit disabled={this.isOwner() || this.isOwnerAsGuest()} text={intl.formatMessage(messages['submit'])} />
          </form>
        </div>
        {this.isOwner() && isEditingField ? (
          <ModalFieldEditor
            isVisible={isFieldEditorModalVisible}
            field={form.fields[isEditingField]}
            onSave={this.onModalFieldEditorSave}
            onClose={this.onModalFieldEditorClose} />
        ) : null}
        {this.isOwner() && typeof isRemovingField !== 'undefined' ? (
          <Dialog
            isVisible={isRemovingField === false ? isRemovingField : true}
            actionMessage={<FormattedMessage id='Form.Remove' defaultMessage='Remove' />}
            onActionClicked={this.onRemoveFieldDialogConfirmClicked(isRemovingField)}
            onCancelClicked={this.onRemoveFieldDialogCancelClicked}
            onOverlayClicked={this.onRemoveFieldDialogOverlayClicked}>
            <Text>
              <FormattedMessage id='Form.ConfirmRemove' defaultMessage='Are you sure you want to remove this field?' />
            </Text>
          </Dialog>
        ) : null}
        {this.isOwner() && typeof isUploadingCoverImage !== 'undefined' ? (
          <Modal
            isVisible={!!isUploadingCoverImage}
            actionMessage={<FormattedMessage id='Form.Save' defaultMessage='Save' />}
            onActionClicked={this.onCoverImageModalSaveClicked}
            onCancelClicked={this.onCoverImageModalCancelClicked}
            onOverlayClicked={this.onCoverImageModalOverlayClicked}>
            <Uploader base={base} onFileUploaded={this.onCoverImageUploaded} />
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default injectIntl(Form)
