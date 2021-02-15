import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Register.css'

const Register = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(password, userName, password2)
    }

    return (
        <div className='register'>
            <div className="register-wrapper">
            <Link to="/" className="btn-flat waves-effect">
              <i>Back to home</i> 
            </Link>
                <form onSubmit={onSubmit}>
                    <div className="container">
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <p>Already have an account? <Link to="/login">Log in</Link> </p>

                        <hr/>

                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" name="username" id="username" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" id="psw" required />

                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required />
                        <hr/>

                        <button type="submit" className="registerbtn">Register</button>
                    </div>

                    <div className="container signin">
                        <p>Already have an account? <Link to="/login">Log in</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
