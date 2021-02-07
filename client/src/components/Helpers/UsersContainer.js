import React, {useState} from 'react'
import UsersModal from './Modal/UsersModal'
import ModalContainer from './Modal/ModalContainer'
import {deleteUser, editUser} from '../../services/usersServices'

const UsersContainer = ({user}) => {
    const {_id, username, job, password, role} = user
    const {isShown, toggle} = ModalContainer()

    const [userName, setUserName] = useState(username)
    const [newPassword, setNewPassword] = useState(password)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)

    const removeUser = async() => {
        let res = await deleteUser(_id)
        console.log(res.user)
    }

    const updateUser = async (userObj) => {
        let res = await editUser(userObj, _id)
        console.log(res)
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        
        const newUser = {
            username: userName,
            password: newPassword,
            role: newRole,
            job: newJob
        }

        updateUser(newUser)

        setUserName('')
        setNewPassword('')
        setNewRole('')
        setNewJob('')

    }

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>ID: {_id} </h3>
                <h3>Name: {username} </h3>
                <h3>Specialty: {job}</h3>
                <button onClick={toggle}>Edit</button>
                <button onClick={removeUser}>Delete</button>
            </div>
                <UsersModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={newPassword} setPassword={setNewPassword}
                role={newRole} setRole={setNewRole}
                job={newJob} setJob={setNewJob}/>
        </section>
    )
}

export default UsersContainer
