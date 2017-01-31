import React, {Component} from 'react'
import {Link} from 'react-router'

import './Browse.css'

import Loading from '../Loading'

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

  getHeaderStyle (form) {
    return form.coverImage ? {
      backgroundImage: `url(${form.coverImage})`
    } : {}
  }

  render () {
    const { forms, isLoading } = this.state

    return (
      <div className='Browse'>
        <ul className='BrowseList'>
          { isLoading ? <Loading /> : forms.map(form => (
            <li className='BrowseListItem' key={form.key}>
              <div className='BrowseListItemHeader' style={this.getHeaderStyle(form)} />
              <div className='BrowseListItemContent'>
                <Link className='BrowseLink' activeClassName='BrowseLinkActive' to={`/browse/${form.key}`}>{form.name || form.key}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Browse
