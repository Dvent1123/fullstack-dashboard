import React, {useState} from 'react'
import {IoCheckmarkCircleSharp} from 'react-icons/io5'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from './Modal/TasksModal'
import {socket} from '../NavBar'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';


const TasksContainer = ({task, assets, tasks, setTasks}) => {
    const {assignedTo, desc,asset,status,createdBy, _id} = task
    const {isShown, toggle} = ModalContainer()

    const [taskAssignedTo, setTaskAssignedTo] = useState(assignedTo)
    const [taskStatus, setTaskStatus] = useState(status)
    const [taskDesc, setTaskDesc] = useState(desc)
    const [taskAsset, setTaskAsset] = useState(asset)

    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)


    const removeTask = async() => {
        socket.emit('deleteTask', _id)
        taskRemovalReturn()
    }

    const taskRemovalReturn = async () => {
        socket.on('TaskDeleted', (result) => {
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
                const arrayAfterDeletion = tasks.filter(item => item._id !== data._id)
                setTasks(arrayAfterDeletion)
                const successToast = {
                    title: 'Success',
                    description: 'Task deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggleToast()
            }
        })
    }

    const updateTask = async () => {
        socket.on('TaskUpdated', (result) => {
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
                const taskIndex = tasks.findIndex(item => item._id === data._id)
                const updatedTasksArray = [...tasks]
                updatedTasksArray[taskIndex] = data
                setTasks(updatedTasksArray)
                const successToast = {
                    title: 'Success',
                    description: 'Task updated!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggleToast()
                toggle()
            }
        })
    }

    //where you update the tasks
    const onSubmit = (e) => {
        e.preventDefault()
        
        const newTask = {
            id: _id,
            createdBy: createdBy,
            assignedTo: taskAssignedTo,
            asset: taskAsset,
            status: taskStatus,
            desc: taskDesc
        }

        socket.emit('updateTask' , newTask)

        updateTask()
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
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
                <TasksModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={taskAssignedTo} setAssignedTo={setTaskAssignedTo}
                desc={taskDesc} setDesc={setTaskDesc}
                assets={assets}
                assignedAsset={taskAsset} setAssignedAsset={setTaskAsset}
                status={taskStatus} setStatus={setTaskStatus}/>
        </section>
    )
}

export default TasksContainer
