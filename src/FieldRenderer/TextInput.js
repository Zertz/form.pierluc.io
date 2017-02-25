import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './TextInput.css'

import AppService from '../AppService'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Label from '../Label'
import Text from '../Text'

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: AppService.getRandomId(),
      tabIndex: parseInt(props.field.order, 10) + 1
    }

    this.setFieldRef = this.setFieldRef.bind(this)
  }

  componentDidMount () {
    const { focus } = this.props
    const { tabIndex } = this.state

    if (focus || tabIndex === 1) {
      this.fieldRef.focus()
    }
  }

  setFieldRef (ref) {
    this.fieldRef = ref
  }

  render () {
    const {
      field,
      disabled,
      onEditClicked,
      onRemoveClicked,
      onChange,
      onKeyPress
    } = this.props

    const { id, tabIndex } = this.state

    return (
      <div className='TextInput'>
        <Label htmlFor={id}>
          <div>{field.label}</div>
          {onEditClicked || onRemoveClicked ? (
            <ButtonGroup>
              {onEditClicked ? (
                <Button small onClick={onEditClicked}>
                  <FormattedMessage id='TextInput.Edit' defaultMessage='Edit' />
                </Button>
              ) : null}
              {onRemoveClicked ? (
                <Button small cancel onClick={onRemoveClicked}>
                  <FormattedMessage id='TextInput.Remove' defaultMessage='Remove' />
                </Button>
              ) : null}
            </ButtonGroup>
          ) : null}
        </Label>
        {field.description && <Text classnames='TextInputDescription'>{field.description}</Text>}
        <input
          id={id}
          ref={this.setFieldRef}
          tabIndex={tabIndex}
          type={field.type}
          value={field.value}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress} />
        {field.help && <Text classnames='TextInputHelp'>{field.help}</Text>}
      </div>
    )
  }
}

TextInput.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    help: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }),
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default TextInput
