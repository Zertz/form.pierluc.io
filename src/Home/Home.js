import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import './Home.css'

import AddItem from '../AddItem.js'
import Form from '../Form'
import FormService from '../FormService'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      todos: [],
      isLoading: true,
      isDemoFormRendered: false
    }

    this.onGetStartedClicked = this.onGetStartedClicked.bind(this)
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

  onGetStartedClicked () {
    this.setState({
      isDemoFormRendered: true
    })
  }

  render () {
    const { todos, isLoading, isDemoFormRendered } = this.state

    return (
      <div className='Home'>
        <div className='HomeTitle Title'>
          <FormattedMessage id='Home.CraftFantasticForms' defaultMessage='Craft fantastic forms.' />
        </div>
        <AddItem add={this.handleAddItem.bind(this)} />
        <ul>
          { isLoading
            ? <li className='HomeLoading'>
              <FormattedMessage id='Home.Loading' defaultMessage='Loading' />
            </li>
            : todos.map((todo, index) => <li key={index}>{todo}</li>) }
        </ul>
        <div className='HomeSubtile Subtitle'>
          <FormattedMessage id='Home.SoHowEasyIsit' defaultMessage='So, how easy is it?' />
        </div>
        <button onClick={this.onGetStartedClicked}>
          <FormattedMessage id='Home.GetStarted' defaultMessage='Get started' />
        </button>
        { isDemoFormRendered && <Form inputs={FormService.getDefault()} /> }
      </div>
    )
  }
}

export default Home
