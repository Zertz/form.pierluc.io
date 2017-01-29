import React, {Component, PropTypes} from 'react'

import './Select.css'

import AppService from '../AppService'
import Text from '../Text'

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId()
    }
  }

  render () {
    const { input, onChange } = this.props
    const { id } = this.state

    return (
      <div className='Select'>
        <select id={id} value={input.value} onChange={onChange}>
          {input.choices.map((choice, index) => (
            <option key={index} value={choice.value}>{choice.label} {choice.amount ? `(${choice.amount})` : ''}</option>
          ))}
        </select>
        <label className='SelectLabel' htmlFor={id}>{input.label}</label>
        <Text classnames='SelectDescription' content={input.description} />
        <Text classnames='SelectHelp' content={input.help} />
      </div>
    )
  }
}

Select.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    help: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func
}

export default Select
