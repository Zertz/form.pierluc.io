/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import Separator from './Separator'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Separator />, div)
})
