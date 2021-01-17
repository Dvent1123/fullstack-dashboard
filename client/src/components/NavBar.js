import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (<nav>
      <div className="nav">
        <Link to="/"><h1>Dashboard</h1></Link>
        </div>
    </nav>

    )
}

export default NavBar
