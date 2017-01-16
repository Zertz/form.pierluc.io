import React, {Component, PropTypes} from 'react'

import './Form.css'

import FieldRenderer from '../FieldRenderer'

import PaymentService from '../PaymentService'

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checkout: PaymentService.initialize({
        isLive: true,
        checkoutCallback: this.checkoutCallback
      })
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async checkoutCallback (token) {
    const { base } = this.props

    try {
      const userToken = await base.auth().currentUser.getToken()
      const stripeToken = token.id
      const formId = this.props.form.id

      const charge = await PaymentService.charge({
        formId,
        stripeToken,
        userToken
      })

      console.info(charge)
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
    const { inputs } = this.props

    return (
      <form className='Form' onSubmit={this.onSubmit}>
        {inputs.map((input, index) => <FieldRenderer key={index} input={input} />)}
      </form>
    )
  }
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired
}

export default Form
