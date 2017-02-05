import React, {Component, PropTypes} from 'react'

import './RadioGroup.css'

import Text from '../Text'

class RadioGroup extends Component {
  render () {
    const { input, onChange } = this.props

    return (
      <radiogroup className='RadioGroup'>
        <div className='RadioGroupLabel'>{input.label}</div>
        {input.description && <Text classnames='RadioGroupDescription' content={input.description} />}
        {input.choices.map((choice, index) => (
          <label className='RadioGroupButton' key={index}>
            <input type='radio' value={choice.value} onChange={onChange} checked={input.value ? choice.value === input.value : choice.value === input.defaultValue} />
            <span>{choice.label}</span>
          </label>
        ))}
        {input.help && <Text classnames='RadioGroupHelp' content={input.help} />}
      </radiogroup>
    )
  }
}

RadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default RadioGroup
