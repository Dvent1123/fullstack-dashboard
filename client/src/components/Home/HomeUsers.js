import React, {useState, useEffect}  from 'react'
import HomeContainerUsers from '../Helpers/HomeContainerUsers'
import {AiFillPlusCircle} from 'react-icons/ai'
import { userData } from '../../Models/user-data'
import ModalUsers from '../Helpers/Modal/ModalUsers'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import axios from 'axios'

const HomeUsers = () => {
    const {isShown, toggle} = ModalContainer()
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [job, setJob] = useState('')
    const [role, setRole] = useState('User')

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            username: userName,
            password: password,
            role: role,
            job: job
        }

        axios.post('http://localhost:5000/users/new', newUser)
            .then(res => console.log(res.data))
        setUserName('')
        setPassword('')
        setJob('')
        setRole('User')
    }


    useEffect(()=> {
        setUsers(userData)
    },[])

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
                        {
                            users.map(user => {
                                return (
                                    <div key={user.id}>
                                        <HomeContainerUsers user={user}/>
                                    </div>
                                )
                            })
                        }
                    </section>
            </section>
    )
}

export default HomeUsers
