import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import {browserHistory, Link} from 'react-router'
import update from 'immutability-helper'

import './Form.css'

import FormService from '../FormService'
import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import FieldRenderer from '../FieldRenderer'
import Loading from '../Loading'
import Modal from '../Modal'
import Title from '../Title'
import Uploader from '../Uploader'

const messages = defineMessages({
  addCoverImage: {
    id: 'Form.AddCoverImage',
    defaultMessage: 'Add cover image'
  },
  changeCoverImage: {
    id: 'Form.ChangeCoverImage',
    defaultMessage: 'Change cover image'
  },
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
      isCoverImageModalShown: undefined
    }

    this.onCoverImageUploaded = this.onCoverImageUploaded.bind(this)
    this.onCoverImageClicked = this.onCoverImageClicked.bind(this)
    this.onCoverImageModalSaveClicked = this.onCoverImageModalSaveClicked.bind(this)
    this.onCoverImageModalCancelClicked = this.onCoverImageModalCancelClicked.bind(this)
    this.onCoverImageModalOverlayClicked = this.onCoverImageModalOverlayClicked.bind(this)

    this.checkoutCallback = this.checkoutCallback.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount () {
    const { base, routeParams } = this.props

    try {
      const form = await base.database().ref('forms/' + routeParams.form).once('value')

      if (!form.val()) {
        throw new Error("We can't find this form at the moment, please try again shortly!")
      }

      this.setState({
        isLoading: false,
        form: form.val(),
        checkout: PaymentService.initialize({
          isLive: true,
          checkoutCallback: this.checkoutCallback
        })
      })
    } catch (error) {
      console.error(error)
    }
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
    const { base, intl, routeParams, user } = this.props
    const { isLoading, isCoverImageModalShown, form } = this.state

    return isLoading ? <Loading /> : (
      <div className='Form'>
        <div className='FormHeader' style={this.getHeaderStyle(form)}>
          {user && form.user === user.uid ? (
            <div>
              <Link className='Button' to={`/browse/${routeParams.form}/edit`}>{intl.formatMessage(messages['edit'])}</Link>
              <Button text={intl.formatMessage(messages[form.coverImage ? 'changeCoverImage' : 'addCoverImage'])} onClick={this.onCoverImageClicked} />
              <Modal
                isVisible={isCoverImageModalShown}
                content={<Uploader base={base} onFileUploaded={this.onCoverImageUploaded} />}
                actionButton={<Button text={intl.formatMessage(messages['save'])} onClick={this.onCoverImageModalSaveClicked} />}
                onCancelClicked={this.onCoverImageModalCancelClicked}
                onOverlayClicked={this.onCoverImageModalOverlayClicked} />
            </div>
          ) : null}
        </div>
        { form.name ? <Title content={form.name} /> : null }
        <form onSubmit={this.onSubmit}>
          {form.inputs.map((input, index) => <FieldRenderer key={index} input={input} onChange={this.onInputChanged(index)} />)}
          <Button text={intl.formatMessage(messages['submit'])} />
        </form>
      </div>
    )
  }
}

export default injectIntl(Form)
