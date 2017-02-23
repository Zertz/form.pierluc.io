/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import DraggableFieldChoices from './DraggableFieldChoices'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DraggableFieldChoices />, div)
})
