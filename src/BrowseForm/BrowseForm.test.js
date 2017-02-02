/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import BrowseForm from './BrowseForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowseForm />, div)
})
