import React from 'react'
import { Link } from 'react-router-dom'

let socket;

const NavBar = () => {
  const handleLogout =() => {
    sessionStorage.clear()
    window.location.href = './'
  }

    return (<nav>
      <div className="nav">
        <Link to="/"><h1>Dashboard</h1></Link>
        <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    </nav>

    )
}

export  {NavBar, socket}
