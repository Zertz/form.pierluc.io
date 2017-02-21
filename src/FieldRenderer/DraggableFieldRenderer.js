import React, {Component, PropTypes} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import classnames from 'classnames'
import flow from 'lodash.flow'

import './DraggableFieldRenderer.css'

import FormService from '../FormService'

import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import Select from './Select'
import TextInput from './TextInput'

import {ItemTypes} from '../Draggable'

const dragSource = {
  beginDrag (props) {
    return {
      fieldKey: props.fieldKey
    }
  },
  endDrag (props, monitor) {
    const drag = monitor.getItem()
    const drop = monitor.getDropResult()

    if (drag && drop && drag.fieldKey !== drop.fieldKey) {
      props.onOrderChanged(drag.fieldKey, drop.fieldKey)
    }
  }
}

const dropTarget = {
  drop (props, monitor) {
    return props ? {
      fieldKey: props.fieldKey
    } : undefined
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
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
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
      disabled,
      onChange,
      onEditClicked,
      onRemoveClicked,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      canDrop
    } = this.props

    const Component = this.getComponent(input.type)

    const style = parseInt(input.order, 10) >= 0 ? {
      order: input.order
    } : {}

    return Component ? connectDragSource(connectDropTarget(
      <div className={classnames('DraggableFieldRenderer', { isDragging, isOver, canDrop })} style={style}>
        <Component
          input={input}
          value={FormService.isMultipleValues(input.type) ? [] : ''}
          disabled={disabled}
          onChange={typeof onChange === 'function' ? onChange : () => {}}
          onEditClicked={onEditClicked}
          onRemoveClicked={onRemoveClicked} />
      </div>
    )) : null
  }
}

DraggableFieldRenderer.propTypes = {
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onEditClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired
}

export default flow([
  DragSource(ItemTypes.FIELD, dragSource, collectSource),
  DropTarget(ItemTypes.FIELD, dropTarget, collectTarget)
])(DraggableFieldRenderer)
