import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import {browserHistory} from 'react-router'
import update from 'immutability-helper'

import './Form.css'

import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import FieldRenderer from '../FieldRenderer'
import Loading from '../Loading'
import Title from '../Title'

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
      isLoading: true
    }

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

  onInputChanged (index) {
    return (e) => {
      const { inputs } = this.state.form

      inputs[index].value = e.target.value

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

  render () {
    const { intl } = this.props
    const { isLoading, form } = this.state

    return isLoading ? <Loading /> : (
      <div className='Form'>
        { form.name ? <Title content={form.name} /> : null }
        <form onSubmit={this.onSubmit}>
          {form.inputs.map((input, index) => <FieldRenderer key={index} input={input} onChange={this.onInputChanged(index)} />)}
          <Button submit text={intl.formatMessage(messages['submit'])} />
        </form>
      </div>
    )
  }
}

export default injectIntl(Form)
