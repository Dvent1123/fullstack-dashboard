import React, {useState, useEffect, useRef, useContext}  from 'react'
import UsersContainer from '../Helpers/UsersContainer'
import {AiFillPlusCircle} from 'react-icons/ai'
import UsersModal from '../Helpers/Modal/UsersModal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { getAllUsers } from '../../services/usersServices'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import jwt_decode from 'jwt-decode'
import {SocketContext} from '../../services/socketService'


const Users = () => {
    const {isShown, toggle} = ModalContainer()
    const [users, setUsers] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [job, setJob] = useState('')
    const [role, setRole] = useState('User')

    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)

    const [loading, setLoading] = useState(true)
    const { token } = useToken()
    const [decoded, setDecoded] = useState('')
    let realToken = useRef()

    const socket = useContext(SocketContext)

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])


    useEffect(()=> {
        const parseToken = JSON.parse(token)
        realToken.current = parseToken.token
        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId)

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId)
            socket.removeAllListeners()
        })        
    }, [token, socket])

//sockets use effect
    useEffect(() => {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

        socket.on('UserAdded', (result) => {
            const {data, success} = result
            if(!success){
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)        
            }else{
                setUsers(prevUsers => [...prevUsers, data])
                const successToast = {
                    title: 'Success',
                    description: 'User added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)   
            }   
        })

        socket.on('UserDeleted', (result) => {
            const {data, success} = result
            if(!success){
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)
            }else{
                if(users){
                    setUsers(prevUsers => prevUsers.filter(item => item._id !== data._id))
                }

                const successToast = {
                    title: 'Success',
                    description: 'User deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
            }
        })

        return(() => {
        socket.removeAllListeners()
        })        
    },[socket, users])

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            username: userName,
            roomId: decoded.roomId,
            password: password,
            role: role,
            job: job
        }

        socket.emit('addUser', newUser)

        toggle()

        setUserName('')
        setPassword('')
        setJob('')
        setRole('User')
    }


    useEffect(()=> {
        const getUsers = () => {
            getAllUsers(realToken.current).then(res => {
                var newArrayUserofObject = Object.values(res.usersArray)
                setUsers(newArrayUserofObject)
            })
            .catch(err => console.log(err))
        }
        getUsers()
    }, [])

    //renders the users
    const renderUsers = (user) => {
        return (
            <div key={user._id}>
                <UsersContainer user={user} users={users} setUsers={setUsers} socket={socket}/>
                </div>
        )
    }

    return (
            <section className="home-containers">
                <Nav />
                <div className="section-title">
                    <h1>Users</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <UsersModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={password} setPassword={setPassword}
                role={role} setRole={setRole}
                job={job} setJob={setJob}/>
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
                <section className="section-container">
                        { loading === false ?
                            (<div className="users">
                            {
                                (users && users.length > 0) ? (
                                    users.map(user => {
                                        return renderUsers(user)
                                    })
                                ) :(
                                        <p>No Users found</p>
                                )
                            }
                            </div>) : (
                                <Loading />
                            )
                        }
                    </section>
            </section>
    )
}

export default Users
