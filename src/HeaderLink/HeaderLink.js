import React, {Component} from 'react'
import {Link} from 'react-router'

import './HeaderLink.css'

class HeaderLink extends Component {
  render () {
    return (
      <Link className='HeaderLink' activeClassName='HeaderLinkActive' {...this.props} />
    )
  }
}

export default HeaderLink
