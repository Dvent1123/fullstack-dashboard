import React, {useState, useEffect}  from 'react'
import HomeContainerUsers from '../Helpers/HomeContainerUsers'
import {AiFillPlusCircle} from 'react-icons/ai'
import { userData } from '../../Models/user-data'
import ModalUsers from '../Helpers/Modal/ModalUsers'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { getAllUsers, createUser } from '../../services/usersServices'
import axios from 'axios'

const HomeUsers = () => {
    const {isShown, toggle} = ModalContainer()
    const [users, setUsers] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [job, setJob] = useState('')
    const [role, setRole] = useState('User')

    const getUsers = async () =>{
        let res = await getAllUsers()
        console.log(res.usersArray)
        setUsers(res.usersArray)
    }

    const newUserFunction = async (userObj) => {
        let res = await createUser(userObj)
        console.log(res)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            username: userName,
            password: password,
            role: role,
            job: job
        }

        newUserFunction(newUser)

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
                <HomeContainerUsers user={user}/>
                </div>
        )
    }

    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Users</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <ModalUsers isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={password} setPassword={setPassword}
                role={role} setRole={setRole}
                job={job} setJob={setJob}/>
                <section className="section-container">
                        <div className="users">
                            {
                                (users && users.length > 0) ? (
                                    users.map(user => {
                                        return renderUsers(user)
                                    })
                                ) :(
                                        <p>No Users found</p>
                                )
                            }
                        </div>
                    </section>
            </section>
    )
}

export default HomeUsers
