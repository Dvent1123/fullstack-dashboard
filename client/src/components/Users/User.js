import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import { userData } from '../../Models/user-data'

const User = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()

    useEffect(()=> {
        const newUser = userData.find((user) => user.id === parseInt(id))
        setUser(newUser)
    })


    return (
        <section className="user-container">
            <div className="user-name"><h2>Name: {user.name}</h2></div>
            <div className="user-id"><h2>ID: {user.id}</h2></div>
            <div className="user-type"><h2>Type: {user.role}</h2></div>
        </section>
    )
}

export default User

