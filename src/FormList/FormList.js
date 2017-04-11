import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import './FormList.css'

import Loading from '../Loading'

class FormList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    const { base, queries } = this.props

    this.formsRef = base.bindToState('forms', {
      context: this,
      state: 'forms',
      asArray: true,
      queries: queries || {
        orderByChild: 'publishedAt'
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

    base.removeBinding(this.formsRef)
  }

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { forms, isLoading } = this.state

    return (
      <ul className='FormList'>
        { isLoading ? <Loading /> : forms.map(form => (
          <li className='FormListItem' key={form.key}>
            <div className='FormListItemHeader' style={this.getHeaderStyle(form)} />
            <div className='FormListItemContent'>
              <Link to={`/browse/${form.key}`}>{form.title || form.key}</Link>
              <Link to={`/browse/${form.key}/edit`}>
                <FormattedMessage id='FormList.Edit' defaultMessage='Edit' />
              </Link>
              <Link to={`/browse/${form.key}/registrations`}>
                <FormattedMessage id='FormList.Registrations' defaultMessage='Registrations' />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default FormList
