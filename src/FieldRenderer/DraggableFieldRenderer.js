import React, {Component, PropTypes} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import flow from 'lodash.flow'

import FormService from '../FormService'

import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextInput from './TextInput'

import {ItemTypes} from '../Draggable'

const dragSource = {
  beginDrag (props) {
    return {
      input: props.input
    }
  }
}

const dropTarget = {
  drop (props) {
    // TODO: Wire this
    // onOrderChanged()
  }
}

function collectSource (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class DraggableFieldRenderer extends Component {
  getComponent (type) {
    switch (type) {
      case 'email':
      case 'number':
      case 'text':
        return TextInput
      case 'radio':
        return RadioGroup
      case 'select':
        return Select
      case 'checkbox':
        return CheckboxGroup
      default:
        return
    }
  }

  render () {
    const {
      input,
      onEditClicked,
      onRemoveClicked,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props

    const Component = this.getComponent(input.type)

    const style = parseInt(input.order, 10) >= 0 ? {
      order: input.order
    } : {}

    return Component ? connectDragSource(connectDropTarget(
      <div className='DraggableFieldRenderer' style={style}>
        <Component
          input={input}
          value={FormService.isMultipleChoices(input.type) ? [] : ''}
          edit={true}
          disabled={true}
          onEditClicked={onEditClicked}
          onRemoveClicked={onRemoveClicked}
          onChange={() => {}}
          isDragging={isDragging} />
      </div>
    )) : null
  }
}

DraggableFieldRenderer.propTypes = {
  input: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired
}

export default flow([
  DragSource(ItemTypes.FIELD, dragSource, collectSource),
  DropTarget(ItemTypes.FIELD, dropTarget, collectTarget)
])(DraggableFieldRenderer)
