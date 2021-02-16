import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Register.css'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import ModalContainer from '../Helpers/Modal/ModalContainer'

import { registerUser} from '../../services/loginServices'


const Register = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)


    //this code works and it also logs the specific error
    const registerNewUser = async (newUser) => {
        try{
            let res = await registerUser(newUser)
            if(res){
                console.log('this worked')
            }
        }catch(error){
            const errorData = error.response.data
            const errorMessage = errorData.errors[0].message

                const errorToast = {
                title: 'Danger',
                description: `${errorMessage}`,
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)
                toggleToast()        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUserObj = {
            username: userName,
            password: password,
            password_confirmation: password2
        }

        registerNewUser(newUserObj)

        setUserName('')
        setPassword('')
        setPassword2('')
    }

    return (
        <div className='register'>
            <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
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
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" name="username" id="username"/>

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
