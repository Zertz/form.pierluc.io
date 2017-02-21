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
      tabIndex: parseInt(props.input.order, 10) + 1
    }
  }

  render () {
    const {
      intl,
      input,
      value,
      disabled,
      onEditClicked,
      onRemoveClicked,
      onChange
    } = this.props

    const { tabIndex } = this.state

    return (
      <radiogroup className='RadioGroup'>
        <div className='Label'>
          <div>{input.label}</div>
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
        {input.description && <Text classnames='RadioGroupDescription'>{input.description}</Text>}
        {Object.keys(input.choices).map((key) => (
          <Label key={key}>
            <input type='radio' value={input.choices[key].label} tabIndex={tabIndex} disabled={disabled} onChange={onChange} checked={value.indexOf(input.choices[key].label) >= 0} />
            <span>{input.choices[key].label} {input.choices[key].amountCents ? `(${PaymentService.getCentsAsCurrency(intl, input.choices[key].amountCents)})` : ''}</span>
          </Label>
        ))}
        {input.help && <Text classnames='RadioGroupHelp'>{input.help}</Text>}
      </radiogroup>
    )
  }
}

RadioGroup.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    choices: PropTypes.object.isRequired,
    description: PropTypes.string,
    help: PropTypes.string
  }),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired
}

export default injectIntl(RadioGroup)
