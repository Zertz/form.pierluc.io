import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './CheckboxGroup.css'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class CheckboxGroup extends Component {
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
      <div className='CheckboxGroup' style={style}>
        <div className='Label'>
          <div>{input.label}</div>
          {edit ? (
            <ButtonGroup>
              <Button small onClick={onEditClicked}>
                <FormattedMessage id='CheckboxGroup.Edit' defaultMessage='Edit' />
              </Button>
              <Button small cancel onClick={onRemoveClicked}>
                <FormattedMessage id='CheckboxGroup.Remove' defaultMessage='Remove' />
              </Button>
            </ButtonGroup>
          ) : null}
        </div>
        {input.description && <Text classnames='CheckboxGroupDescription'>{input.description}</Text>}
        {input.choices.map((choice, index) => (
          <Label key={index}>
            <input type='checkbox' value={choice.value} onChange={onChange} checked={(input.values || []).indexOf(choice.value) >= 0} />
            <span>{choice.label}</span>
          </Label>
        ))}
        {input.help && <Text classnames='CheckboxGroupHelp'>{input.help}</Text>}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CheckboxGroup
