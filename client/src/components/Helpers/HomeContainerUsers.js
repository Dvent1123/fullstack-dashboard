import React, {useState} from 'react'
import ModalUsers from '../Helpers/Modal/ModalUsers'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import {deleteUser} from '../../services/usersServices'

const HomeContainerUsers = ({user}) => {
    const {_id, username, job, password, role} = user
    const {isShown, toggle} = ModalContainer()

    const [userName, setUserName] = useState(username)
    const [newPassword, setNewPassword] = useState(password)
    const [newJob, setNewJob] = useState(job)
    const [newRole, setNewRole] = useState(role)
    const [id, setId] = useState(_id)

    const removeUser = async() => {
        let res = await deleteUser(id)
        console.log(res.user)
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('something was submitted')

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
                <ModalUsers isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                userName={userName} setUserName={setUserName}
                password={newPassword} setPassword={setNewPassword}
                role={newRole} setRole={setNewRole}
                job={newJob} setJob={setNewJob}/>
        </section>
    )
}

export default HomeContainerUsers
