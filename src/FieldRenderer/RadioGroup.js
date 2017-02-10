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
        {input.description && <Text classnames='RadioGroupDescription' content={input.description} />}
        {input.choices.map((choice, index) => (
          <Label key={index}>
            <input type='radio' value={choice.value} onChange={onChange} checked={input.value ? choice.value === input.value : choice.value === input.defaultValue} />
            <span>{choice.label}</span>
          </Label>
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
