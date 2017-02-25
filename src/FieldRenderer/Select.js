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

    const { id, tabIndex } = this.state

    const orderedChoices = Object.keys(field.choices).sort((a, b) => {
      return field.choices[a].order > field.choices[b].order
    })

    return (
      <div className='Select'>
        {field.label && <Label htmlFor={id}>
          <div>{field.label}</div>
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
        {field.description && <Text classnames='SelectDescription'>{field.description}</Text>}
        <div className='SelectWrapper'>
          <select id={id} tabIndex={tabIndex} value={field.value || (orderedChoices.length > 0 ? orderedChoices[0] : '')} disabled={disabled} onChange={onChange}>
            {orderedChoices.map((key) => (
              <option key={key} value={key}>{field.choices[key].label} {field.choices[key].amountCents ? `(${PaymentService.getCentsAsCurrency(intl, field.choices[key].amountCents)})` : ''}</option>
            ))}
          </select>
        </div>
        {field.help && <Text classnames='SelectHelp'>{field.help}</Text>}
      </div>
    )
  }
}

Select.propTypes = {
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

export default injectIntl(Select)
