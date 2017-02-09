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
      id: AppService.getRandomId()
    }

    this.setInputRef = this.setInputRef.bind(this)
  }

  componentDidMount () {
    const { focus } = this.props

    if (focus) {
      this.inputRef.focus()
    }
  }

  setInputRef (ref) {
    this.inputRef = ref
  }

  render () {
    const {
      input,
      edit,
      onEditClicked,
      onRemoveClicked,
      onChange,
      onKeyPress
    } = this.props

    const { id } = this.state

    return (
      <div className='TextInput'>
        {input.label && (
          <Label htmlFor={id}>
            <div>{input.label}</div>
            {edit ? (
              <ButtonGroup>
                <Button small onClick={onEditClicked}>
                  <FormattedMessage id='TextInput.Edit' defaultMessage='Edit' />
                </Button>
                <Button small cancel onClick={onRemoveClicked}>
                  <FormattedMessage id='TextInput.Remove' defaultMessage='Remove' />
                </Button>
              </ButtonGroup>
            ) : null}
          </Label>
        )}
        <input
          id={id}
          ref={this.setInputRef}
          type={input.type}
          value={input.value || ''}
          onChange={onChange}
          onKeyPress={onKeyPress} />
        {input.description && <Text classnames='TextInputDescription' content={input.description} />}
        {input.help && <Text classnames='TextInputHelp' content={input.help} />}
      </div>
    )
  }
}

TextInput.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    help: PropTypes.string
  }),
  onEditClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

export default TextInput
