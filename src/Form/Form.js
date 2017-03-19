import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'
import cloneDeep from 'lodash.clonedeep'
import update from 'immutability-helper'

import './Form.css'

import FormService from '../FormService'
import PaymentService from '../PaymentService'
import RegistrationService from '../RegistrationService'

import Button from '../Button'
import FieldList from '../FieldList'
import Loading from '../Loading'
import Title from '../Title'

class Form extends Component {
  constructor (props) {
    super(props)

    this.checkoutCallback = this.checkoutCallback.bind(this)

    this.state = {
      isLoading: true,
      checkout: PaymentService.initialize({
        checkoutCallback: this.checkoutCallback
      })
    }

    this.isOwner = this.isOwner.bind(this)
    this.onEditClicked = this.onEditClicked.bind(this)
    this.onFieldChanged = this.onFieldChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    const { base, routeParams } = this.props

    this.ref = base.listenTo(`forms/${routeParams.form}`, {
      context: this,
      then (form) {
        if (!form || this.state.form) {
          return this.setState({
            isLoading: false
          })
        }

        const registration = {
          fields: cloneDeep(form.fields)
        }

        for (const key in registration.fields) {
          if (!registration.fields.hasOwnProperty(key)) {
            continue
          }

          const field = registration.fields[key]

          if (FormService.isMultipleChoices(field.type)) {
            const orderedChoices = FormService.getOrderedChoices(field.choices)

            field.value = FormService.isMultipleValues(field.type) ? [] : orderedChoices.length > 0 ? orderedChoices[0] : ''
          } else {
            field.value = ''
          }
        }

        this.setState({
          isLoading: false,
          form,
          registration
        })
      },
      onFailure (error) {
        console.error(error)
      }
    })
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  scrollIntoView (ref) {
    if (ref) {
      ref.scrollIntoView()
    }
  }

  isOwner () {
    const { user } = this.props
    const { form } = this.state

    return user && form && form.user === user.uid
  }

  onEditClicked () {
    const { routeParams } = this.props

    browserHistory.push(`/browse/${routeParams.form}/edit`)
  }

  onFieldChanged (key) {
    return (e) => {
      const { registration } = this.state

      const value = ((field) => {
        if (FormService.isMultipleValues(field.type)) {
          const valueIndex = field.value.indexOf(e.target.value)

          return valueIndex < 0 ? { $push: [e.target.value] } : { $splice: [[valueIndex, 1]] }
        } else {
          return { $set: e.target.value }
        }
      })(registration.fields[key])

      this.setState({
        registration: update(registration, {
          fields: {
            [key]: { value }
          }
        })
      })
    }
  }

  async onSubmit (e) {
    e.preventDefault()

    const { base } = this.props
    const { checkout, form, registration } = this.state

    this.setState({
      isLoading: true
    })

    try {
      const token = base.auth().currentUser ? await base.auth().currentUser.getToken() : undefined
      const registrationId = await RegistrationService.create(base, registration)

      const { amount } = await PaymentService.amount({
        registrationId,
        token
      })

      this.setState({
        isLoading: false,
        registrationId
      }, () => {
        if (amount && Number(amount) > 0) {
          checkout.open({
            name: 'form.pierluc.io',
            description: form.title || '',
            currency: 'cad',
            amount
          })
        } else {
          browserHistory.push('/me')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async checkoutCallback (checkoutResponse) {
    const { base } = this.props
    const { registrationId } = this.state

    this.setState({
      isLoading: true
    })

    try {
      const token = base.auth().currentUser ? await base.auth().currentUser.getToken() : undefined
      const source = checkoutResponse.id

      await PaymentService.charge({
        registrationId,
        source,
        token
      })

      browserHistory.push('/me')
    } catch (error) {
      console.error(error)
    }
  }

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { isLoading, form, registration } = this.state

    return isLoading ? <Loading /> : form && registration ? (
      <div className='Form' ref={this.scrollIntoView}>
        <div className='FormHeader' style={this.getHeaderStyle(form)}>
          {this.isOwner() ? (
            <Button onClick={this.onEditClicked}>
              <FormattedMessage id='Form.Edit' defaultMessage='Edit' />
            </Button>
          ) : null}
        </div>
        <div className='FormContent'>
          <Title>{form.title}</Title>
          <form className='FormForm' onSubmit={this.onSubmit}>
            <FieldList fields={registration.fields} onFieldChanged={this.onFieldChanged} />
            <Button submit>
              <FormattedMessage id='Form.Submit' defaultMessage='Submit' />
            </Button>
          </form>
        </div>
      </div>
    ) : null
  }
}

export default Form
