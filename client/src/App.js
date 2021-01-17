import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import HomeTasks from './components/Home/HomeTasks'
import HomeAssets from './components/Home/HomeAssets'
import HomeUsers from './components/Home/HomeUsers'
//error page
import Error from './components/Error'
///navbar
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
        <NavBar />
        <Home />
        <Switch>
            <Route path='/assets' component={HomeAssets}/>
            <Route path='/tasks' exact component={HomeTasks} />
            <Route path='/users' exact component={HomeUsers} />
            <Route path='*' component={Error}/>
        </Switch>
    </Router>
  )
}

export default App

