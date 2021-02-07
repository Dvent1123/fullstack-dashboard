import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
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

export default Home