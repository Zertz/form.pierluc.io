/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import EditableTitle from './EditableTitle'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EditableTitle />, div)
})
