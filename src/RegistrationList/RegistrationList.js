import React, {Component} from 'react'
import {Link} from 'react-router'

import './RegistrationList.css'

import Loading from '../Loading'

class RegistrationList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    const { base, params } = this.props

    this.registrationsRef = base.bindToState('registrations', {
      context: this,
      state: 'registrations',
      asArray: true,
      queries: {
        orderByChild: 'form',
        equalTo: params.form
      },
      then () {
        this.setState({
          isLoading: false
        })
      },
      onFailure (error) {
        console.error(error)
      }
    })
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.registrationsRef)
  }

  render () {
    const { params } = this.props
    const { registrations, isLoading } = this.state

    return (
      <ul className='RegistrationList'>
        { isLoading ? <Loading /> : registrations.map(registration => (
          <li className='RegistrationListItem' key={registration.key}>
            <div className='RegistrationListItemHeader' />
            <div className='RegistrationListItemContent'>
              <Link to={`/browse/${params.form}/registrations/${registration.key}`}>{registration.key}</Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default RegistrationList
