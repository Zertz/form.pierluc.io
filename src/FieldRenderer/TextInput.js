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
      tabIndex: parseInt(props.input.order, 10) + 1
    }

    this.setInputRef = this.setInputRef.bind(this)
  }

  componentDidMount () {
    const { tabIndex } = this.state

    if (tabIndex === 1) {
      this.inputRef.focus()
    }
  }

  setInputRef (ref) {
    this.inputRef = ref
  }

  render () {
    const {
      input,
      value,
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
          <div>{input.label}</div>
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
        {input.description && <Text classnames='TextInputDescription'>{input.description}</Text>}
        <input
          id={id}
          ref={this.setInputRef}
          tabIndex={tabIndex}
          type={input.type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyPress={onKeyPress} />
        {input.help && <Text classnames='TextInputHelp'>{input.help}</Text>}
      </div>
    )
  }
}

TextInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    help: PropTypes.string
  }),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
}

export default TextInput
