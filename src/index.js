import React from 'react'
import ReactDOM from 'react-dom'
import Rebase from 're-base'
import App from './App'
import './index.css'

const base = Rebase.createClass({
  apiKey: 'AIzaSyBH3i6QPS7Dd1Bjs-fdO-Q5oUPMhPtYiPM',
  authDomain: 'form-pierluc-io-1642a.firebaseapp.com',
  databaseURL: 'https://form-pierluc-io-1642a.firebaseio.com',
  storageBucket: 'form-pierluc-io-1642a.appspot.com',
  messagingSenderId: '1040118765063'
})

ReactDOM.render(
  <App base={base} />,
  document.getElementById('root')
)
