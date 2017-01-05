import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

import localeData from '../messages/data.json'

addLocaleData([...en])

import './index.css'

import App from './App'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'

import Browse from './Browse'
import Create from './Create'
import Profile from './Profile'

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en

ReactDOM.render((
  <IntlProvider locale={language} messages={messages}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='browse' component={Browse} />
        <Route path='create' component={Create} />
        <Route path='me' component={Profile} />
        <Route path='connect' component={Login} />
        <Route path='disconnect' component={Logout} />
      </Route>
    </Router>
  </IntlProvider>
), document.getElementById('root'))
