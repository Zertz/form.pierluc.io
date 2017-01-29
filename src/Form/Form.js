import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

import './Form.css'

import PaymentService from '../PaymentService'

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

  async checkoutCallback (token) {
    const { base, routeParams } = this.props

    try {
      const userToken = await base.auth().currentUser.getToken()
      const stripeToken = token.id
      const formId = routeParams.form

      const response = await PaymentService.charge({
        formId,
        stripeToken,
        userToken
      })

      const json = await response.json()

      console.info(json)
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
        <form className='FormForm' onSubmit={this.onSubmit}>
          {form.inputs.map((input, index) => <FieldRenderer key={index} input={input} />)}
          <Button submit text={intl.formatMessage(messages['submit'])} />
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  inputs: PropTypes.array
}

export default injectIntl(Form)
