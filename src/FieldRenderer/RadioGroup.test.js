/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import RadioGroup from './RadioGroup'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RadioGroup />, div)
})
