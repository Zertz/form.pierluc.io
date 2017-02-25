import React, {Component, PropTypes} from 'react'

import './EditableFieldList.css'

import {DraggableFieldRenderer} from '../FieldRenderer'

class EditableFieldList extends Component {
  render () {
    const {
      fields,
      onEditClicked,
      onRemoveClicked,
      onOrderChanged
    } = this.props

    return (
      <div className='EditableFieldList'>
        {Object.keys(fields).map((key) => (
          <DraggableFieldRenderer
            key={key}
            fieldKey={key}
            field={fields[key]}
            disabled
            onEditClicked={onEditClicked(key)}
            onRemoveClicked={onRemoveClicked(key)}
            onOrderChanged={onOrderChanged}
            onChange={() => {}} />
        ))}
      </div>
    )
  }
}

EditableFieldList.propTypes = {
  fields: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
  onOrderChanged: PropTypes.func.isRequired
}

export default EditableFieldList
