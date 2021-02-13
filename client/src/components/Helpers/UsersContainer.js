import React, {useState} from 'react'
import UsersModal from './Modal/UsersModal'
import ModalContainer from './Modal/ModalContainer'
import {socket} from '../NavBar'

const UsersContainer = ({user, users, setUsers}) => {
    const {_id, username, job, password, role} = user
    const {isShown, toggle} = ModalContainer()

    const [userName, setUserName] = useState(username)
    const [newPassword, setNewPassword] = useState(password)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)


    const removeUser = async () => {
        socket.emit('deleteUser', _id)
        userRemovalReturn()
    }

    const userRemovalReturn = async () => {
        socket.on('UserDeleted', (result) => {
            const {data, success} = result
            if(!success){
                //handle error here
            }else{
                const arrayAfterDeletion = users.filter(item => item._id !== data._id)
                setUsers(arrayAfterDeletion)
            }
        })
    }

    const updateUser = async () => {
        socket.on('UserUpdated', (result) => {
            const {data, success} = result
            if(!success){
                //handle error
                toggle()
            }else{
                const userIndex = users.findIndex(item => item._id === data._id)
                const updatedUsersArray = [...users]
                updatedUsersArray[userIndex] = data
                setUsers(updatedUsersArray)
                toggle()
            }
        })
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        
        const newUser = {
            id: _id,
            username: userName,
            password: newPassword,
            role: newRole,
            job: newJob
        }

        socket.emit('updateUser', newUser)
        updateUser()
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
