import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/Login.css'
import { loginUser} from '../../services/loginServices'
import Toast from '../Toast/Toast'
import errorIcon from '../../assets/error.svg';
import ModalContainer from '../Helpers/Modal/ModalContainer'
import useToken from '../../utils/useToken'


const Login = () => {
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)
    const { token, setToken } = useToken()

        //this code works and it also logs the specific error
    const loginNewUser = async (newUser) => {
        try{
            const res = await loginUser(newUser).then(newToken => 
                {
                    return newToken
                })
            setToken(res)

        }catch(error){
            console.log(error)
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

    useEffect(() => {
        if(token){
             window.location.href = './home'
        }
    }, [token])

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
