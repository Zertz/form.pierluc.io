/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import Browse from './Browse'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Browse />, div)
})
