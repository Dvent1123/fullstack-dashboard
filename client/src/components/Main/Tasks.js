import React, {useState, useEffect} from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import TasksContainer from '../Helpers/TasksContainer'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from '../Helpers/Modal/TasksModal'
import {getAll} from '../../services/assetsService'
import {getAllTasks} from '../../services/tasksService'
import {socket} from '../NavBar'

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const {isShown, toggle} = ModalContainer()
    const [createdBy, setCreatedBy] = useState('Daniel')
    const [assignedTo, setAssignedTo] = useState('None')
    const [status, setStatus] = useState('')
    const [desc, setDesc] = useState('')
    const [assets, setAssets] = useState(null)
    const [assignedAsset, setAssignedAsset] = useState('')

    //gets the assets using the services
    const getAssets = async () => {
        let res = await getAll()
        setAssets(res.assetsArray)
    };

    const getTasks = async () => {
        let res = await getAllTasks()
        setTasks(res.tasksArray)
    }

    const newTaskFunction = async () => {
        socket.on('TaskAdded', (result) => {
            const {data, success} = result
            if(!success){
                toggle()
            }else{
                setTasks([...tasks, data])
                toggle()
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const newTask = {
                createdBy: createdBy,
                assignedTo: assignedTo,
                asset: assignedAsset,
                status: status,
                desc: desc
            }

            socket.emit('addTask', newTask)
            newTaskFunction()

            setCreatedBy('')
            setAssignedTo('None')
            setDesc('')
    }

    useEffect(() => {
        if(!tasks){
        getTasks();
      }
    })

    //useeffect to get the assets to fill out modal
    useEffect(() => {
      if(!assets){
        getAssets();
      }
    });

   

    //renders the task
    const renderTasks = (filteredTask) => {
        return (
            <div key={filteredTask._id}>
                <TasksContainer task={filteredTask} assets={assets} tasks={tasks} setTasks={setTasks}/>
            </div>
        )
    }

    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Tasks</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <TasksModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                desc={desc} setDesc={setDesc}
                assets={assets}
                assignedAsset={assignedAsset} setAssignedAsset={setAssignedAsset}
                status={status} setStatus={setStatus}/>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Not Complete</h2>
                    </div>
                            <div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 1).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                            </div>
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>In Progress</h2>
                    </div>
                            <div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 2).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                            </div>
                </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Pending Approval</h2>
                    </div>
                            <div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 3).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                            </div>
                </section>
            </section>
    )
}

export default Tasks
