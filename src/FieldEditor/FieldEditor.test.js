/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import FieldEditor from './FieldEditor'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FieldEditor />, div)
})
