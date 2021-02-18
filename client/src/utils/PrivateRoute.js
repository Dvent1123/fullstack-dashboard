import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, token, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            token ?
            <Component {...props} />
            : <Redirect to='/' />
        )}/>
    )
}

export default PrivateRoute