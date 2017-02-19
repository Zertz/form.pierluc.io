import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './CheckboxGroup.css'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tabIndex: parseInt(props.input.order, 10) + 1
    }
  }

  render () {
    const {
      input,
      value,
      disabled,
      onEditClicked,
      onRemoveClicked,
      onChange
    } = this.props

    // const { tabIndex } = this.state

    return (
      <div className='CheckboxGroup'>
        <div className='Label'>
          <div>{input.label}</div>
          {onEditClicked || onRemoveClicked ? (
            <ButtonGroup>
              {onEditClicked ? (
                <Button small onClick={onEditClicked}>
                  <FormattedMessage id='CheckboxGroup.Edit' defaultMessage='Edit' />
                </Button>
              ) : null}
              {onRemoveClicked ? (
                <Button small cancel onClick={onRemoveClicked}>
                  <FormattedMessage id='CheckboxGroup.Remove' defaultMessage='Remove' />
                </Button>
              ) : null}
            </ButtonGroup>
          ) : null}
        </div>
        {input.description && <Text classnames='CheckboxGroupDescription'>{input.description}</Text>}
        {input.choices.map((choice, index) => (
          <Label key={index}>
            <input type='checkbox' value={choice.label} disabled={disabled} onChange={onChange} checked={value.indexOf(choice.label) >= 0} />
            <span>{choice.label} {choice.amount ? `(${choice.amount})` : ''}</span>
          </Label>
        ))}
        {input.help && <Text classnames='CheckboxGroupHelp'>{input.help}</Text>}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      amount: PropTypes.number
    })),
    description: PropTypes.string,
    help: PropTypes.string
  }),
  value: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired
}

export default CheckboxGroup
