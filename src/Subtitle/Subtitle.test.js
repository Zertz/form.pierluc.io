/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import Subtitle from './Subtitle'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Subtitle />, div)
})
