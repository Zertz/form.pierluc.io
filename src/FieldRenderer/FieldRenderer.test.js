/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import {FieldRenderer} from './FieldRenderer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FieldRenderer />, div)
})
