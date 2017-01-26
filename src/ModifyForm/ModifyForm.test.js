/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import ModifyForm from './ModifyForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ModifyForm />, div)
})
