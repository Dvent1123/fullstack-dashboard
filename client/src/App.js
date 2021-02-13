import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Main/Home'
import Tasks from './components/Main/Tasks'
import Assets from './components/Main/Assets'
import Users from './components/Main/Users'
//error page
import Error from './components/Error'
///navbar
import {NavBar} from './components/NavBar'
import Toast from './components/Toast/Toast'
import checkIcon from './assets/check.svg'
import errorIcon from './assets/error.svg';
import infoIcon from './assets/info.svg';
import warningIcon from './assets/warning.svg';


const App = () => {

  return (
    <Router>
        <NavBar />
        <Home />
        {/* <Toast toast={toast} position='bottom-right' /> */}
        <Switch>
            <Route path='/assets' component={Assets}/>
            <Route path='/tasks' exact component={Tasks} />
            <Route path='/users' exact component={Users} />
            <Route path='*' component={Error}/>
        </Switch>
    </Router>
  )
}

export default App

