import React, {useEffect, useRef, useContext} from 'react'
import { Link } from 'react-router-dom'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
import {SocketContext} from '../../services/socketService'

const Home = () => {
    let realToken = useRef()
    const { token } = useToken()
    const parseToken = JSON.parse(token)
    realToken.current = parseToken.token
    const socket = useContext(SocketContext)

    useEffect(() => {
            let decoded = jwt_decode(realToken.current)
            socket.emit('subscribe', decoded.roomId)
            socket.on('joined', message => console.log(message))

            return () => {
                socket.emit('unsubscribe', decoded.roomId)
                socket.removeAllListeners()
            }
    })


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

export {Home}