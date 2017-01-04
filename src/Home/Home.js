import React, {Component} from 'react'

import './Home.css'

import AddItem from '../AddItem.js'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      isLoading: true
    }
  }

  componentDidMount () {
    const { base } = this.props

    this.ref = base.syncState('todoList', {
      context: this,
      state: 'todos',
      asArray: true,
      then () {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount () {
    const { base } = this.props

    base.removeBinding(this.ref)
  }

  handleAddItem (todo) {
    const { todos } = this.state

    this.setState({
      todos: todos.concat([todo])
    })
  }

  render () {
    const { todos, isLoading } = this.state

    return (
      <div className='Home'>
        <div className="HomeTitle Title">Craft fantastic forms.</div>
        <AddItem add={this.handleAddItem.bind(this)} />
        <ul>
          { isLoading ? <li className='HomeLoading'>Loading...</li> : todos.map((todo, index) => <li key={index}>{todo}</li>) }
        </ul>
      </div>
    )
  }
}

export default Home
