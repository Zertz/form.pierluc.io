/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import BrowseRegistration from './BrowseRegistration'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowseRegistration />, div)
})
