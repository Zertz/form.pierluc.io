import React, {Component, PropTypes} from 'react'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import './RadioGroup.css'

import PaymentService from '../PaymentService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class RadioGroup extends Component {
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

    return (
      <radiogroup className='RadioGroup'>
        <div className='Label'>
          <div>{field.label}</div>
          {onEditClicked || onRemoveClicked ? (
            <ButtonGroup>
              {onEditClicked ? (
                <Button small onClick={onEditClicked}>
                  <FormattedMessage id='RadioGroup.Edit' defaultMessage='Edit' />
                </Button>
              ) : null}
              {onRemoveClicked ? (
                <Button small cancel onClick={onRemoveClicked}>
                  <FormattedMessage id='RadioGroup.Remove' defaultMessage='Remove' />
                </Button>
              ) : null}
            </ButtonGroup>
          ) : null}
        </div>
        {field.description && <Text classnames='RadioGroupDescription'>{field.description}</Text>}
        {Object.keys(field.choices).map((key) => (
          <Label key={key}>
            <input type='radio' value={field.choices[key].label} tabIndex={tabIndex} disabled={disabled} onChange={onChange} checked={field.value.indexOf(field.choices[key].label) >= 0} />
            <span>{field.choices[key].label} {field.choices[key].amountCents ? `(${PaymentService.getCentsAsCurrency(intl, field.choices[key].amountCents)})` : ''}</span>
          </Label>
        ))}
        {field.help && <Text classnames='RadioGroupHelp'>{field.help}</Text>}
      </radiogroup>
    )
  }
}

RadioGroup.propTypes = {
  intl: intlShape.isRequired,
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.object.isRequired,
    description: PropTypes.string,
    help: PropTypes.string,
    value: PropTypes.string
  }),
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired
}

export default injectIntl(RadioGroup)
