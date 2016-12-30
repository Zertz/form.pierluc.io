import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import AddItem from './AddItem.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      list: [],
      loading: true
    }
  }

  componentDidMount () {
    const { base } = this.props

    this.ref = base.syncState('todoList', {
      context: this,
      state: 'list',
      asArray: true,
      then () {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  handleAddItem (newItem) {
    this.setState({
      list: this.state.list.concat([newItem])
    })
  }

  render () {
    const { list, loading } = this.state

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AddItem add={this.handleAddItem.bind(this)} />
        <ul>
          { loading ? <li className='loading'>Loading...</li> : list.map((item, index) => <li key={index}>{item}</li>) }
        </ul>
      </div>
    )
  }
}

export default App
