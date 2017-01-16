import React, {Component} from 'react'

import './Select.css'

import AppService from '../AppService'

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId(),
      selectedValue: String(props.input.value)
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({
      selectedValue: e.target.value
    })
  }

  render () {
    const { input } = this.props
    const { selectedValue, id } = this.state

    return (
      <div className='Select'>
        <label className='SelectLabel' htmlFor={id}>{input.label}</label>
        <select id={id} value={selectedValue} onChange={this.onChange}>
          {input.choices.map((choice, index) => (
            <option key={index} value={choice.value}>{choice.label}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default Select
