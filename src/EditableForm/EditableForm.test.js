/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import EditableForm from './EditableForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EditableForm />, div)
})
