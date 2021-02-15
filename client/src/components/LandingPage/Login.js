import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Login.css'

const Login = () => {
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(password, username)
    }

    return (
        <div className='login'>
            <div className="login-wrapper">
                    <Link to="/">
                        Back to home
                    </Link>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                <form onSubmit={onSubmit}>
                <div className="imgcontainer">
                    <img alt="Avatar" className="avatar" />
                </div>

                <div className="container">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} name="username" required/>

                    <label htmlFor="passorw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required/>

                    <button type="submit">Login</button>
                </div>

                <div className="container" style={{backgroundColor:'#f1f1f1'}}>
                    <button type="button" className="cancelbtn">Cancel</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login
