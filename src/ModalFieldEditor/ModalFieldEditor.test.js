/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import ModalFieldEditor from './ModalFieldEditor'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ModalFieldEditor />, div)
})
