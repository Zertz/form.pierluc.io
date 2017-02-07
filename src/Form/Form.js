import React, {Component} from 'react'
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'
import update from 'immutability-helper'

import './Form.css'

import FormService from '../FormService'
import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import EditableTitle from '../EditableTitle'
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

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { base, intl } = this.props
    const { isLoading, isCoverImageModalShown, form } = this.state

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
        <div className="FormContent">
          {this.isOwner() ? (
            <EditableTitle onSave={this.onTitleSaved}>{form.name || ''}</EditableTitle>
          ) : form.name ? <Title>{form.name}</Title> : null}
          <form onSubmit={this.onSubmit}>
            {form.inputs.map((input, index) => <FieldRenderer key={index} input={input} onChange={this.onInputChanged(index)} />)}
            <Button submit text={intl.formatMessage(messages['submit'])} />
          </form>
        </div>
        {this.isOwner() ? (
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
