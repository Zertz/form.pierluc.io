import React, {Component} from 'react'

import './Logout.css'

class Logout extends Component {
  componentDidMount() {
    const { base } = this.props

    base.auth().signOut().then(() => {
      this.props.router.push('/')
    }, (err) => {
      console.error(err)
    })
  }

  render () {
    return (
      <div className='Logout'>Log out!</div>
    )
  }
}

export default Logout
