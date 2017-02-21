import React, {Component, PropTypes} from 'react'
import {injectIntl, intlShape, FormattedMessage} from 'react-intl'

import './Select.css'

import AppService from '../AppService'
import PaymentService from '../PaymentService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId(),
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

    const { id, tabIndex } = this.state

    return (
      <div className='Select'>
        {input.label && <Label htmlFor={id}>
          <div>{input.label}</div>
          {onEditClicked || onRemoveClicked ? (
            <ButtonGroup>
              {onEditClicked ? (
                <Button small onClick={onEditClicked}>
                  <FormattedMessage id='Select.Edit' defaultMessage='Edit' />
                </Button>
              ) : null}
              {onRemoveClicked ? (
                <Button small cancel onClick={onRemoveClicked}>
                  <FormattedMessage id='Select.Remove' defaultMessage='Remove' />
                </Button>
              ) : null}
            </ButtonGroup>
          ) : null}
        </Label>}
        {input.description && <Text classnames='SelectDescription'>{input.description}</Text>}
        <div className='SelectWrapper'>
          <select id={id} tabIndex={tabIndex} value={value} disabled={disabled} onChange={onChange}>
            {Object.keys(input.choices).map((key) => (
              <option key={key} value={input.choices[key].label}>{input.choices[key].label} {input.choices[key].amountCents ? `(${PaymentService.getCentsAsCurrency(intl, input.choices[key].amountCents)})` : ''}</option>
            ))}
          </select>
        </div>
        {input.help && <Text classnames='SelectHelp'>{input.help}</Text>}
      </div>
    )
  }
}

Select.propTypes = {
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

export default injectIntl(Select)
