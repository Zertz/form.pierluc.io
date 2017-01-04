import React, {Component} from 'react'

import './Create.css'

class Create extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <div className='Create'>
        <form className='CreateForm' onSubmit={this.onSubmit}>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Create
