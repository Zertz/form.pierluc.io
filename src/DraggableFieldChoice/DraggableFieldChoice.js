import React, {Component, PropTypes} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import {defineMessages, injectIntl, intlShape} from 'react-intl'
import classnames from 'classnames'
import flow from 'lodash.flow'

import './DraggableFieldChoice.css'

import {ItemTypes} from '../Draggable'

import {FieldRenderer} from '../FieldRenderer'

const messages = defineMessages({
  label: {
    id: 'DraggableFieldChoice.Label',
    defaultMessage: 'Label'
  },
  amount: {
    id: 'DraggableFieldChoice.Amount',
    defaultMessage: 'Amount'
  }
})

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

class DraggableFieldChoice extends Component {
  constructor (props) {
    super(props)

    this.state = {
      choiceFields: {
        label: {
          type: 'text',
          label: props.intl.formatMessage(messages.label)
        },
        amountCents: {
          type: 'number',
          label: props.intl.formatMessage(messages.amount)
        }
      }
    }
  }

  render () {
    const {
      choice,
      onChange,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      canDrop
    } = this.props

    const { choiceFields } = this.state

    const style = parseInt(choice.order, 10) >= 0 ? {
      order: choice.order
    } : {}

    return connectDragSource(connectDropTarget(
      <div className={classnames('DraggableFieldChoice', { isDragging, isOver, canDrop })} style={style}>
        {Object.keys(choiceFields).map((key) => (
          <FieldRenderer
            key={key}
            input={choiceFields[key]}
            value={choice[key] && key === 'amountCents' ? parseInt(choice[key], 10) / 100 : choice[key]}
            onChange={onChange(key)} />
        ))}
      </div>
    ))
  }
}

DraggableFieldChoice.propTypes = {
  intl: intlShape.isRequired,
  choice: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default flow([
  DragSource(ItemTypes.CHOICE, dragSource, collectSource),
  DropTarget(ItemTypes.CHOICE, dropTarget, collectTarget)
])(injectIntl(DraggableFieldChoice))
