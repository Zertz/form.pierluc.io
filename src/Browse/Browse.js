import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import './Browse.css'

class Browse extends Component {
  constructor (props) {
    super(props)

    this.state = {
      forms: [],
      isLoading: true
    }
  }

  componentDidMount () {
    const { base } = this.props

    this.ref = base.syncState('forms', {
      context: this,
      state: 'forms',
      asArray: true,
      then () {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  render () {
    const { forms, isLoading } = this.state

    return (
      <div className='Browse'>
        <ul>
          { isLoading
            ? <li className='BrowseLoading'>
              <FormattedMessage id='Browse.Loading' defaultMessage='Loading' />
            </li>
            : forms.map(form => (
              <li key={form.key}>
                <Link className='BrowseLink' activeClassName='BrowseLinkActive' to={`/browse/${form.key}`}>{form.key}</Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

export default Browse
