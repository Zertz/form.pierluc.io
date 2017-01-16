import React, {Component} from 'react'

import './CheckboxGroup.css'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedValue: String(props.input.choices[0].value)
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
    const { selectedValue } = this.state

    return (
      <div className='CheckboxGroup'>
        <label className='CheckboxGroupLabel'>{input.label}</label>
        {input.choices.map((choice, index) => (
          <div className='CheckboxGroupButton' key={index}>
            <input type='checkbox' value={choice.value} onChange={this.onChange} checked={String(choice.value) === selectedValue} />
            <span>{choice.label}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default CheckboxGroup
