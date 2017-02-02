import React, {Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import {Link} from 'react-router'

import './FormList.css'

import Loading from '../Loading'

const messages = defineMessages({
  edit: {
    id: 'FormList.Edit',
    defaultMessage: 'Edit'
  }
})

class Browse extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url('${form.coverImage}')`
    } : {}
  }

  render () {
    const { intl, user } = this.props
    const { forms, isLoading } = this.state

    return (
      <ul className='FormList'>
        { isLoading ? <Loading /> : forms.map(form => (
          <li className='FormListItem' key={form.key}>
            <div className='FormListItemHeader' style={this.getHeaderStyle(form)}>
              {user && form.user === user.uid ? (
                <Link className='Button' to={`/browse/${form.key}/edit`}>{intl.formatMessage(messages['edit'])}</Link>
              ) : null}
            </div>
            <div className='FormListItemContent'>
              <Link to={`/browse/${form.key}`}>{form.name || form.key}</Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default injectIntl(Browse)
