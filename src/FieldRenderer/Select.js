import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './Select.css'

import AppService from '../AppService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId()
    }
  }

  render () {
    const {
      input,
      edit,
      style,
      onEditClicked,
      onRemoveClicked,
      onChange
    } = this.props

    const { id } = this.state

    return (
      <div className='Select' style={style}>
        {input.label && <Label htmlFor={id}>
          <div>{input.label}</div>
          {edit ? (
            <ButtonGroup>
              <Button small onClick={onEditClicked}>
                <FormattedMessage id='Select.Edit' defaultMessage='Edit' />
              </Button>
              <Button small cancel onClick={onRemoveClicked}>
                <FormattedMessage id='Select.Remove' defaultMessage='Remove' />
              </Button>
            </ButtonGroup>
          ) : null}
        </Label>}
        {input.description && <Text classnames='SelectDescription'>{input.description}</Text>}
        <div className='SelectWrapper'>
          <select id={id} value={input.value || input.defaultValue || ''} onChange={onChange}>
            {input.choices.map((choice, index) => (
              <option key={index} value={choice.value}>{choice.label} {choice.amount ? `(${choice.amount})` : ''}</option>
            ))}
          </select>
        </div>
        {input.help && <Text classnames='SelectHelp'>{input.help}</Text>}
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
