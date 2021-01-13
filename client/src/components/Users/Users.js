import React, { useState, useEffect } from 'react'
import UserItems from './UserItems'
import { Link, useParams } from 'react-router-dom'
import { userData } from '../../Models/user-data'

const Users = () => {
    const [users, setUsers] = useState(userData)

    return (
        <div className='users-container'>
            <div className='users-title'><h1>You are in the Locations Page</h1></div>
                <section className="users-items-container">
                    {
                        users.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Link to={`/users/${user.id}`} className="nav-location">
                                        <UserItems prop={user}/>
                                    </Link>
                                </div>
                            
                            )
                        })
                    }
                </section>
        </div>
    )
}

export default Users
