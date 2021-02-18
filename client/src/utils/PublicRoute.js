import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PublicRoute = ( {component: Component, token, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            token && restricted ?
            //if they are logged in and this is restricted then it redirects to home
            //so it won't show the login page if they are logged in
                <Redirect to='/home' />
                : <Component {...props}/>
        )} />
    )
}

export default PublicRoute