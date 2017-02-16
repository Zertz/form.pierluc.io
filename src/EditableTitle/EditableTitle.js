import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import './EditableTitle.css'

import Button from '../Button'
import {FieldRenderer} from '../FieldRenderer'
import Title from '../Title'

class EditableTitle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      title: props.children
    }

    this.setEditing = this.setEditing.bind(this)

    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

    this.onSaveClicked = this.onSaveClicked.bind(this)
    this.onCancelClicked = this.onCancelClicked.bind(this)
  }

  setEditing () {
    this.setState({
      isEditing: true
    })
  }

  onChange (e) {
    this.setState({
      title: e.target.value
    })
  }

  onKeyPress (e) {
    if (e.key === 'Enter') {
      this.onSaveClicked(e)
    }
  }

  onSaveClicked () {
    const { onSave } = this.props
    const { title } = this.state

    this.setState({
      isEditing: false
    })

    onSave(title)
  }

  onCancelClicked () {
    const { children } = this.props

    this.setState({
      isEditing: false,
      title: children
    })
  }

  render () {
    const { isEditing, title } = this.state

    return (
      <div className='EditableTitle'>
        {isEditing ? (
          <div className='EditableTitleEditor'>
            <FieldRenderer focus input={{ type: 'text', label: '' }} value={{value: title}} onChange={this.onChange} onKeyPress={this.onKeyPress} />
            <div className='EditableTitleEditorButtons'>
              <Button onClick={this.onSaveClicked}>
                <FormattedMessage id='EditableTitle.Save' defaultMessage='Save' />
              </Button>
              <Button cancel onClick={this.onCancelClicked}>
                <FormattedMessage id='EditableTitle.Cancel' defaultMessage='Cancel' />
              </Button>
            </div>
          </div>
        ) : (
          <div className='EditableTitleViewer'>
            <Title>{title}</Title>
            <Button onClick={this.setEditing}>
              {title ? (
                <FormattedMessage id='EditableTitle.Change' defaultMessage='Edit title' />
              ) : (
                <FormattedMessage id='EditableTitle.Add' defaultMessage='Add title' />
              )}
            </Button>
          </div>
        )}
      </div>
    )
  }
}

EditableTitle.propTypes = {
  children: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
}

export default EditableTitle
