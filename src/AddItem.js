import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class AddItem extends Component {
  handleSubmit (e) {
    if (e.keyCode === 13) {
      this.props.add(ReactDOM.findDOMNode(this.refs.newItem).value)
      ReactDOM.findDOMNode(this.refs.newItem).value = ''
    }
  }

  render () {
    return (
      <div className='AddItem'>
        <input
          type='text'
          ref='newItem'
          className='AddItemInput'
          placeholder='New Item'
          onKeyDown={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}

export default AddItem
