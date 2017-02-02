/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import FormList from './FormList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FormList />, div)
})
