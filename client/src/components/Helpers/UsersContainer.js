import React, {useState} from 'react'
import UsersModal from './Modal/UsersModal'
import ModalContainer from './Modal/ModalContainer'
import {socket} from '../Main/Home'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';

const UsersContainer = ({user, users, setUsers}) => {
    const {_id, username,roomId, job, password, role} = user
    const {isShown, toggle} = ModalContainer()

    const [userName, setUserName] = useState(username)
    const [newPassword, setNewPassword] = useState(password)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)

    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)


    const removeUser = async () => {
        socket.emit('deleteUser', _id)
        userRemovalReturn()
    }

    const userRemovalReturn = async () => {
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
                toggleToast()            
            }else{
                const arrayAfterDeletion = users.filter(item => item._id !== data._id)
                setUsers(arrayAfterDeletion)
                const successToast = {
                    title: 'Success',
                    description: 'User deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()
            }
        })
    }

    const updateUser = async () => {
        socket.on('UserUpdated', (result) => {
            const {data, success} = result
            if(!success){
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)
                toggleToast()                
                toggle()
            }else{
                const userIndex = users.findIndex(item => item._id === data._id)
                const updatedUsersArray = [...users]
                updatedUsersArray[userIndex] = data
                setUsers(updatedUsersArray)
                const successToast = {
                    title: 'Success',
                    description: 'The user was updated!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()
            }
        })
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        
        const newUser = {
            id: _id,
            username: userName,
            roomId: roomId,
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
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
                <UsersModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={newPassword} setPassword={setNewPassword}
                role={newRole} setRole={setNewRole}
                job={newJob} setJob={setNewJob}/>
        </section>
    )
}

export default UsersContainer
