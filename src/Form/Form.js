import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {browserHistory} from 'react-router'
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
      registration: {
        fields: {}
      },
      checkout: PaymentService.initialize({
        checkoutCallback: this.checkoutCallback
      })
    }

    this.isOwner = this.isOwner.bind(this)
    this.onEditClicked = this.onEditClicked.bind(this)
    this.onFieldChanged = this.onFieldChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount () {
    const { base, routeParams } = this.props

    this.ref = base.listenTo(`forms/${routeParams.form}`, {
      context: this,
      then (form) {
        const { registration } = this.state
        const fieldsUpdate = {}

        for (const key in form.fields) {
          if (!form.fields.hasOwnProperty(key)) {
            continue
          }

          const value = FormService.isMultipleChoices(form.fields[key].type) ? {
            values: []
          } : {
            value: ''
          }

          if (!registration[key]) {
            fieldsUpdate[key] = { $set: value }
          }
        }

        this.setState({
          isLoading: false,
          form,
          registration: update(registration, {
            fields: fieldsUpdate
          })
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
    const { form, isGuest } = this.state

    return user && form && form.user === user.uid && !isGuest
  }

  onEditClicked () {
    const { routeParams } = this.props

    browserHistory.push(`/browse/${routeParams.form}/edit`)
  }

  onFieldChanged (key) {
    return (e) => {
      const { form, registration } = this.state

      if (FormService.isMultipleValues(form.fields[key].type)) {
        const valueIndex = registration.fields[key].values.indexOf(e.target.value)

        if (valueIndex === -1) {
          this.setState({
            registration: update(registration, {
              fields: {
                [key]: {
                  values: { $push: [e.target.value] }
                }
              }
            })
          })
        } else {
          this.setState({
            registration: update(registration, {
              fields: {
                [key]: {
                  values: { $splice: [[e.target.value, 1]] }
                }
              }
            })
          })
        }
      } else {
        this.setState({
          registration: update(registration, {
            fields: {
              [key]: {
                $set: {
                  value: e.target.value
                }
              }
            }
          })
        })
      }
    }
  }

  async checkoutCallback (token) {
    const { base, routeParams } = this.props
    const { registration } = this.state

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

      await RegistrationService.create(base, Object.assign(registration, {
        charge
      }))

      browserHistory.push('/me')
    } catch (error) {
      console.error(error)
    }
  }

  onSubmit (e) {
    e.preventDefault()

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
    const { isLoading, form, registration } = this.state

    return isLoading ? <Loading /> : (
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
            <FieldList
              fields={form.fields || {}}
              values={registration.fields || {}}
              onFieldChanged={this.onFieldChanged} />
            <Button submit>
              <FormattedMessage id='Form.Submit' defaultMessage='Submit' />
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Form
