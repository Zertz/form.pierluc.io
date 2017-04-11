/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationList from './RegistrationList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RegistrationList />, div)
})
