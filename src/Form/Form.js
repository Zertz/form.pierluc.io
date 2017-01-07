import React, {Component, PropTypes} from 'react'

import InputRenderer from './InputRenderer'

class Form extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    const { inputs } = this.props

    return (
      <form className='Form' onSubmit={this.onSubmit}>
        { inputs.map((input, index) => <InputRenderer key={index} input={input} />) }
      </form>
    )
  }
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired
}

export default Form
