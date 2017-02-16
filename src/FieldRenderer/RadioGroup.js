import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './RadioGroup.css'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class RadioGroup extends Component {
  render () {
    const {
      input,
      value,
      edit,
      style,
      onEditClicked,
      onRemoveClicked,
      onChange
    } = this.props

    return (
      <radiogroup className='RadioGroup' style={style}>
        <div className='Label'>
          <div>{input.label}</div>
          {edit ? (
            <ButtonGroup>
              <Button small onClick={onEditClicked}>
                <FormattedMessage id='RadioGroup.Edit' defaultMessage='Edit' />
              </Button>
              <Button small cancel onClick={onRemoveClicked}>
                <FormattedMessage id='RadioGroup.Remove' defaultMessage='Remove' />
              </Button>
            </ButtonGroup>
          ) : null}
        </div>
        {input.description && <Text classnames='RadioGroupDescription'>{input.description}</Text>}
        {value.map((choice, index) => (
          <Label key={index}>
            <input type='radio' value={choice.value} onChange={onChange} checked={input.value ? choice.value === input.value : choice.value === input.defaultValue} />
            <span>{choice.label}</span>
          </Label>
        ))}
        {input.help && <Text classnames='RadioGroupHelp'>{input.help}</Text>}
      </radiogroup>
    )
  }
}

RadioGroup.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
    help: PropTypes.string
  }),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default RadioGroup
