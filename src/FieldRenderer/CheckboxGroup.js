import React, {Component, PropTypes} from 'react'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import './CheckboxGroup.css'

import FormService from '../FormService'
import PaymentService from '../PaymentService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class CheckboxGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tabIndex: parseInt(props.field.order, 10) + 1
    }
  }

  render () {
    const {
      intl,
      field,
      disabled,
      onEditClicked,
      onRemoveClicked,
      onChange
    } = this.props

    const { tabIndex } = this.state

    const orderedChoices = FormService.getOrderedChoices(field.choices)

    return (
      <div className='CheckboxGroup'>
        <div className='Label'>
          <div>{field.label}</div>
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
        {field.description && <Text classnames='CheckboxGroupDescription'>{field.description}</Text>}
        {orderedChoices.map((key, index) => (
          <Label key={key}>
            <input type='checkbox' value={key} tabIndex={tabIndex + index} disabled={disabled} onChange={onChange} checked={(field.value || []).indexOf(key) >= 0} />
            <span>{field.choices[key].label} {field.choices[key].amountCents ? `(${PaymentService.getCentsAsCurrency(intl, field.choices[key].amountCents)})` : ''}</span>
          </Label>
        ))}
        {field.help && <Text classnames='CheckboxGroupHelp'>{field.help}</Text>}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  intl: intlShape.isRequired,
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.object.isRequired,
    description: PropTypes.string,
    help: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string)
  }),
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired
}

export default injectIntl(CheckboxGroup)
