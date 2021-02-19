import React, {useState, useEffect} from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import TasksContainer from '../Helpers/TasksContainer'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import TasksModal from '../Helpers/Modal/TasksModal'
import {getAll} from '../../services/assetsService'
import {getAllTasks} from '../../services/tasksService'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import {socket} from '../Main/Home'

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const {isShown, toggle} = ModalContainer()
    const [createdBy, setCreatedBy] = useState('Daniel')
    const [assignedTo, setAssignedTo] = useState('None')
    const [status, setStatus] = useState('')
    const [desc, setDesc] = useState('')
    const [assets, setAssets] = useState(null)
    const [assignedAsset, setAssignedAsset] = useState('')

    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const [toast, setToast] = useState(null)

    const [loading, setLoading] = useState(true)
    const { token} = useToken()


    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    //gets the assets using the services
    const getAssets = async () => {
        const parseToken = JSON.parse(token)
        console.log(parseToken.token)
        let res = await getAll(parseToken.token)
        setAssets(res.assetsArray)
    };

    const getTasks = async () => {
        const parseToken = JSON.parse(token)
        let res = await getAllTasks(parseToken.token)
        setTasks(res.tasksArray)
    }

    const newTaskFunction = async () => {
        socket.on('TaskAdded', (result) => {
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
                setTasks([...tasks, data])
                const successToast = {
                    title: 'Success',
                    description: 'Task added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()
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
                <Nav />
                <div className="section-title">
                    <h1>Tasks</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
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
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 1).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>In Progress</h2>
                    </div>
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 2).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Pending Approval</h2>
                    </div>
                            { loading === false ?
                                (<div className="tasks">
                                    {(tasks && tasks.length > 0) ? (
                                        tasks.filter(task => task.status === 3).map(filteredTask => {
                                         return renderTasks(filteredTask)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No tasks found</p>
                                    )}
                                </div>) : (
                                    <Loading />
                                )
                            }
                </section>
            </section>
    )
}

export default Tasks
