import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './index.css'

import App from './App'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
    </Route>
  </Router>
), document.getElementById('root'))
