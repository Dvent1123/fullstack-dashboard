import React from 'react'
import socketIoClient from 'socket.io-client'

    function getSocket(){
        const tokenString = sessionStorage.getItem('token')

        if(tokenString) {
            const parseToken = JSON.parse(tokenString)
            const realToken = parseToken.token
            return socketIoClient('http://localhost:5000', {transports: ['websocket', 'polling'], auth: {token: realToken}})
        }

        return socketIoClient('http://localhost:5000')
    }

export const socket = getSocket()
export const SocketContext = React.createContext()

