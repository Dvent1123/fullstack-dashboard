import React, {useState, useEffect}  from 'react'
import UsersContainer from '../Helpers/UsersContainer'
import {AiFillPlusCircle} from 'react-icons/ai'
import UsersModal from '../Helpers/Modal/UsersModal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { getAllUsers } from '../../services/usersServices'
// import {socket} from '../NavBar'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import {socket} from '../Main/Home'


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

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])


    const getUsers = async () =>{
        const parseToken = JSON.parse(token)
        let res = await getAllUsers(parseToken.token)
        setUsers(res.usersArray)
    }

    const newUserFunction = async (userObj) => {
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
                toggle()
                toggleToast()            
            }else{
                setUsers([...users, data])
                const successToast = {
                    title: 'Success',
                    description: 'User added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()            }   
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            username: userName,
            password: password,
            role: role,
            job: job
        }

        socket.emit('addUser', newUser)
        newUserFunction()

        setUserName('')
        setPassword('')
        setJob('')
        setRole('User')
    }


    useEffect(()=> {
        if(!users){
            getUsers();
        }
    })

    //renders the users
    const renderUsers = (user) => {
        return (
            <div key={user._id}>
                <UsersContainer user={user} users={users} setUsers={setUsers}/>
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
