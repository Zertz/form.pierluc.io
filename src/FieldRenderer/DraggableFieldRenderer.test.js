/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import DraggableFieldRenderer from './DraggableFieldRenderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DraggableFieldRenderer />, div)
})
