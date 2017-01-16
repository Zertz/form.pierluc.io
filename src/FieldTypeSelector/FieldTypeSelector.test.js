/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import FieldTypeSelector from './FieldTypeSelector'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FieldTypeSelector />, div)
})
