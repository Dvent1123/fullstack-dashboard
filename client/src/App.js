import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Locations from './components/Locations/Locations'
import Assets from './components/Assets/Assets'
import Users from './components/Users/Users'
import Location from './components/Locations/Location'
import Asset from './components/Assets/Asset'
import User from './components/Users/User'
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
            <Route path='/locations' exact component={Locations}/>
            <Route path='/assets' exact component={Assets}/>
            <Route path='/users' exact component={Users}/>
            <Route path='/locations/:id' children={<Location />}/>
            <Route path='/assets/:id' children={<Asset />}/>
            <Route path='/users/:id' children={<User />}/>
            <Route path='*' component={Error}/>
        </Switch>
    </Router>
  )
}

export default App

