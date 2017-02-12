import React, {Component, PropTypes} from 'react'

import './FieldList.css'

import FieldRenderer from '../FieldRenderer'

class FieldList extends Component {
  render () {
    const { fields, values, onFieldChanged } = this.props

    return (
      <div className='FieldList'>
        {Object.keys(fields).map((key) => fields[key] ? (
          <FieldRenderer
            key={key}
            input={fields[key]}
            value={values[key]}
            style={{order: fields[key].order - Object.keys(fields).length}}
            onChange={onFieldChanged(key)} />
        ) : null)}
      </div>
    )
  }
}

FieldList.propTypes = {
  fields: PropTypes.object.isRequired,
  onFieldChanged: PropTypes.func.isRequired
}

export default FieldList
