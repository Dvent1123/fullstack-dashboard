import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Home from './components/Main/Home'
import Tasks from './components/Main/Tasks'
import Assets from './components/Main/Assets'
import Users from './components/Main/Users'
import Landing from './components/LandingPage/Landing'
//error page
import Error from './components/Error'
///navbar
import {NavBar} from './components/NavBar'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/Login'

const App = () => {

  return (
    <Router>
        <NavBar />
        {/* <Home /> */}
        {/* <Landing /> */}

        <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/assets' component={Assets}/>
            <Route path='/tasks' exact component={Tasks} />
            <Route path='/users' exact component={Users} />
            <Route path='*' component={Error}/>
        </Switch>
    </Router>
  )
}

export default App

