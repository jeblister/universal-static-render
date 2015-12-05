
import React from 'react'
import Router from 'react-router'
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute

import Root  from './components/Root.jsx'
import Index from  './pages/Index.jsx'
import About from  './pages/About.jsx'
import Home  from './pages/Home.jsx'
//import NoMatch  from './pages/404Page.jsx'

var Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/about' handler={About} />
    <Route path='/home' handler={Home} />
  </Route>
)

export default Routes
