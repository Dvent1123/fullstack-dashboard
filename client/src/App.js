import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Assets from './components/Assets/Assets'
import Asset from './components/Assets/Asset'
//error page
import Error from './components/Error'
///navbar
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/assets' exact component={Assets}/>
            <Route path='*' component={Error}/>
        </Switch>
    </Router>
  )
}

export default App

