import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

import localeData from '../messages/data.json'

addLocaleData([...en])

import './reset.css'
import './index.css'

import App from './App'
import Browse from './Browse'
import Connect from './Connect'
import CreateForm from './CreateForm'
import Form from './Form'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import ModifyForm from './ModifyForm'
import Profile from './Profile'

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en

ReactDOM.render((
  <IntlProvider locale={language} messages={messages}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='browse'>
          <IndexRoute component={Browse} />
          <Route path=':form' component={Form} />
        </Route>
        <Route path='create' component={CreateForm} />
        <Route path='me'>
          <IndexRoute component={Profile} />
          <Route path='connect' component={Connect} />
          <Route path=':form' component={ModifyForm} />
        </Route>
        <Route path='connect' component={Login} />
        <Route path='disconnect' component={Logout} />
      </Route>
    </Router>
  </IntlProvider>
), document.getElementById('root'))
