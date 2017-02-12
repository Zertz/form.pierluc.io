/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import EditableFieldList from './EditableFieldList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EditableFieldList />, div)
})
