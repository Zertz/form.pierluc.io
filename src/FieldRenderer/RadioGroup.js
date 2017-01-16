import React, {Component} from 'react'

import './RadioGroup.css'

class RadioGroup extends Component {
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
      <radiogroup className='RadioGroup'>
        <div className='RadioGroupLabel'>{input.label}</div>
        {input.choices.map((choice, index) => (
          <label className='RadioGroupButton' key={index}>
            <input type='radio' value={choice.value} onChange={this.onChange} checked={String(choice.value) === selectedValue} />
            <span>{choice.label}</span>
          </label>
        ))}
      </radiogroup>
    )
  }
}

export default RadioGroup
