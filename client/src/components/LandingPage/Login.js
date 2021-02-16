import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Login.css'
import { loginUser} from '../../services/loginServices'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import ModalContainer from '../Helpers/Modal/ModalContainer'


const Login = () => {
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)

        //this code works and it also logs the specific error
    const loginNewUser = async (newUser) => {
        try{
            let res = await loginUser(newUser)
            if(res){
                console.log('this worked')
                console.log(res)
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
                toggleToast()
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const loginUser = {
            username: username,
            password: password,
        }

        loginNewUser(loginUser)

        setPassword('')
        setUserName('')
    }

    return (
        <div className='login'>
            <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
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
