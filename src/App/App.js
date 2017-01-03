import React, {Component} from 'react'
import Rebase from 're-base'

import './App.css'

import Header from '../Header'
import Footer from '../Footer'

class App extends Component {
  render () {
    const base = Rebase.createClass({
      apiKey: 'AIzaSyBH3i6QPS7Dd1Bjs-fdO-Q5oUPMhPtYiPM',
      authDomain: 'form-pierluc-io-1642a.firebaseapp.com',
      databaseURL: 'https://form-pierluc-io-1642a.firebaseio.com',
      storageBucket: 'form-pierluc-io-1642a.appspot.com',
      messagingSenderId: '1040118765063'
    })

    return (
      <div className='App'>
        <Header />
        <div className='AppContent'>
          {this.props.children && React.cloneElement(this.props.children, { base })}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
