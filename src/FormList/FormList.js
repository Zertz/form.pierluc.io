import React, {Component} from 'react'
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

    this.ref = base.syncState('forms', {
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
    const { forms, isLoading } = this.state

    return (
      <ul className='FormList'>
        { isLoading ? <Loading /> : forms.map(form => (
          <li className='FormListItem' key={form.key}>
            <div className='FormListItemHeader' style={this.getHeaderStyle(form)} />
            <div className='FormListItemContent'>
              <Link to={`/browse/${form.key}`}>{form.name || form.key}</Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default FormList
