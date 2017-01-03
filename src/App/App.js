import React, {Component} from 'react'
import Rebase from 're-base'

import './App.css'

import Header from '../Header'
import Menu from '../Menu'
import Footer from '../Footer'

class App extends Component {
  constructor (props) {
    super(props)

    const base = Rebase.createClass({
      apiKey: 'AIzaSyBH3i6QPS7Dd1Bjs-fdO-Q5oUPMhPtYiPM',
      authDomain: 'form-pierluc-io-1642a.firebaseapp.com',
      databaseURL: 'https://form-pierluc-io-1642a.firebaseio.com',
      storageBucket: 'form-pierluc-io-1642a.appspot.com',
      messagingSenderId: '1040118765063'
    })

    this.state = { base }
  }

  componentDidMount () {
    const { base } = this.state

    base.auth().onAuthStateChanged((user) => {
      this.setState({ user })
    })
  }

  render () {
    const { base, user } = this.state

    return (
      <div className='App'>
        <Header />
        <Menu user={user} />
        <div className='AppContent'>
          {this.props.children && React.cloneElement(this.props.children, { base, user })}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
