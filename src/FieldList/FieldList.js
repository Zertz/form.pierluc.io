import React, {Component, PropTypes} from 'react'

import './FieldList.css'

import {FieldRenderer} from '../FieldRenderer'

class FieldList extends Component {
  render () {
    const { fields, onFieldChanged } = this.props

    return (
      <div className='FieldList'>
        {Object.keys(fields).map((key) => (
          <FieldRenderer
            key={key}
            field={fields[key]}
            onChange={onFieldChanged(key)} />
        ))}
      </div>
    )
  }
}

FieldList.propTypes = {
  fields: PropTypes.object.isRequired,
  onFieldChanged: PropTypes.func.isRequired
}

export default FieldList
