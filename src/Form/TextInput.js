import React, {Component} from 'react'

class TextInput extends Component {
  render () {
    return (
      <div className='TextInput'>
        <input type='text' {...this.props} />
      </div>
    )
  }
}

export default TextInput
