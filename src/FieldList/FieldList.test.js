/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import FieldList from './FieldList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FieldList />, div)
})
