/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import CheckboxGroup from './CheckboxGroup'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CheckboxGroup />, div)
})
