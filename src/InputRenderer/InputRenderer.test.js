/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import InputRenderer from './InputRenderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<InputRenderer />, div)
})
