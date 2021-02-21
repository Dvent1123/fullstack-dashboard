import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import socketIoClient from 'socket.io-client'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
let socket;

const Home = () => {
    const { token } = useToken()
    const parseToken = JSON.parse(token)
    const realToken = parseToken.token
    useEffect(() => {
        socket = socketIoClient('http://localhost:5000', {transports: ['websocket', 'polling'], auth: {token: realToken}})
        //this is where we will join a room by emitting the room number we want to join 
        let decoded = jwt_decode(realToken)
        socket.emit('subscribe', decoded.roomId)
        socket.on('joined', message => console.log(message))
    })

    // useEffect(() => {
    // })

    return (
        <div className="home-container">
            <div className="nav-container">
            <ul className="nav-inner">
                <li className="nav-item">
                <Link to="/assets" className="nav-link">Assets</Link>
                </li>
                <li className="nav-item">
                <Link to="/tasks" className="nav-link">Tasks</Link>
                </li>
                <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
                </li>
            </ul>
            </div>
        </div>


    )
}

export {Home, socket}