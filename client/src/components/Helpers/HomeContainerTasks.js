import React, {useState} from 'react'
import {IoCheckmarkCircleSharp} from 'react-icons/io5'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import ModalTasks from '../Helpers/Modal/ModalTasks'
import {deleteTask} from '../../services/tasksService'

const HomeContainerTasks = ({task, assets}) => {
    const {assignedTo, desc,asset,status,createdBy, _id} = task
    const {isShown, toggle} = ModalContainer()

    const [taskCreatedBy, setTaskCreatedBy] = useState(createdBy)
    const [taskAssignedTo, setTaskAssignedTo] = useState(assignedTo)
    const [taskStatus, setTaskStatus] = useState(status)
    const [taskDesc, setTaskDesc] = useState(desc)
    const [taskAsset, setTaskAsset] = useState(asset)
    const [id, setId] = useState(_id)

    const removeTask = async() => {
        let res = await deleteTask(id)
        console.log(res.task)
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('something was submitted')

    }


    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>Assigned To: {assignedTo} </h3>
                <h3>Task: {desc} </h3>
                <h3>Asset #: {asset}</h3>
                <button className="default-button" onClick={toggle}>Edit</button>
                <button onClick={removeTask}>Delete</button>
                <IoCheckmarkCircleSharp size={'50px'}/>
            </div>
                <ModalTasks isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={taskAssignedTo} setAssignedTo={setTaskAssignedTo}
                desc={taskDesc} setDesc={setTaskDesc}
                assets={assets}
                assignedAsset={taskAsset} setAssignedAsset={setTaskAsset}
                status={taskStatus} setStatus={setTaskStatus}/>
        </section>
    )
}

export default HomeContainerTasks
