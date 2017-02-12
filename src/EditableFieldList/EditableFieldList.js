import React, {Component, PropTypes} from 'react'

import './EditableFieldList.css'

import FieldRenderer from '../FieldRenderer'

class EditableFieldList extends Component {
  render () {
    const { fields, onEditClicked, onRemoveClicked } = this.props

    return (
      <div className='EditableFieldList'>
        {Object.keys(fields).map((key) => fields[key] ? (
          <FieldRenderer
            key={key}
            edit={true}
            input={fields[key]}
            style={{order: fields[key].order - Object.keys(fields).length}}
            onEditClicked={onEditClicked(key)}
            onRemoveClicked={onRemoveClicked(key)}
            onChange={() => {}} />
        ) : null)}
      </div>
    )
  }
}

EditableFieldList.propTypes = {
  fields: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired
}

export default EditableFieldList
