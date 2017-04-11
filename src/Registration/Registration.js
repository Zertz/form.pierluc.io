import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Registration.css'

import Button from '../Button'
import FieldList from '../FieldList'
import Loading from '../Loading'

class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }

    this.isOwner = this.isOwner.bind(this)
    this.onChargeClicked = this.onChargeClicked.bind(this)
  }

  componentDidMount () {
    const { base, params } = this.props

    this.registrationRef = base.listenTo(`registrations/${params.registration}`, {
      context: this,
      then (registration) {
        if (!registration || this.state.registration) {
          return this.setState({
            isLoading: false
          })
        }

        this.setState({
          isLoading: false,
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

    base.removeBinding(this.registrationRef)
  }

  isOwner () {
    const { user } = this.props
    const { registration } = this.state

    return user && registration && registration.user === user.uid
  }

  onChargeClicked () {
    // TODO
  }

  onFieldChanged () {
    return () => {}
  }

  render () {
    const { isLoading, form, registration } = this.state

    return isLoading ? <Loading /> : registration ? (
      <div className='Registration'>
        <div className='RegistrationHeader'>
          {this.isOwner() ? (
            <Button onClick={this.onChargeClicked}>
              <FormattedMessage id='Registration.Charge' defaultMessage='Charge' />
            </Button>
          ) : null}
        </div>
        <div className='RegistrationContent'>
          <form className='RegistrationForm'>
            <FieldList fields={registration.fields} onFieldChanged={this.onFieldChanged} />
          </form>
        </div>
      </div>
    ) : null
  }
}

export default Registration
