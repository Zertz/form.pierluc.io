import React, {Component, PropTypes} from 'react'

import './EditableFieldList.css'

import {DraggableFieldRenderer} from '../FieldRenderer'

class EditableFieldList extends Component {
  render () {
    const { fields, onEditClicked, onRemoveClicked, onOrderChanged } = this.props

    return (
      <div className='EditableFieldList'>
        {Object.keys(fields).map((key) => fields[key] ? (
          <DraggableFieldRenderer
            key={key}
            edit
            disabled
            input={fields[key]}
            style={{order: fields[key].order - Object.keys(fields).length}}
            onEditClicked={onEditClicked(key)}
            onRemoveClicked={onRemoveClicked(key)}
            onOrderChanged={onOrderChanged}
            onChange={() => {}} />
        ) : null)}
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
