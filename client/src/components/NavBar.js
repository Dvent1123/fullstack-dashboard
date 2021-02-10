import React from 'react'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

let socket;

const NavBar = () => {
  socket = socketIOClient('http://localhost:5000',  {transports: ['polling','websocket']})

    return (<nav>
      <div className="nav">
        <Link to="/"><h1>Dashboard</h1></Link>
        </div>
    </nav>

    )
}

export  {NavBar, socket}
