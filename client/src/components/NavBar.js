import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (<nav>
      <div className="nav">
        <Link to="/"><h1>Dashboard</h1></Link>
        <div className="nav-container">
          <ul className="nav-inner">
            <li className="nav-item">
              <Link to="/assets" className="nav-link">Assets</Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
        </div>
    </nav>

    )
}

export default NavBar