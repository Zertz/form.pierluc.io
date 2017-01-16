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

  onChange (index) {
    return (e) => {
      this.setState({
        selectedValue: e.target.value
      })
    }
  }

  render () {
    const { input } = this.props
    const { selectedValue } = this.state

    return (
      <div className='CheckboxGroup'>
        <div className='CheckboxGroupLabel'>{input.label}</div>
        {input.choices.map((choice, index) => (
          <label className='CheckboxGroupButton' key={index}>
            <input type='checkbox' value={choice.value} onChange={this.onChange(index)} checked={String(choice.value) === selectedValue} />
            <span>{choice.label}</span>
          </label>
        ))}
      </div>
    )
  }
}

export default CheckboxGroup
