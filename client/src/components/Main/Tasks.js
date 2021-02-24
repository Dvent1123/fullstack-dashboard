import React, {useState, useEffect, useRef, useContext} from 'react'
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
import jwt_decode from 'jwt-decode'
import {SocketContext} from '../../services/socketService'


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
    const [decoded, setDecoded] = useState('')
    let realToken = useRef()
    const socket = useContext(SocketContext)


    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const parseToken = JSON.parse(token)
        realToken.current = parseToken.token
        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId)

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId)
            socket.removeAllListeners()
        })        
    }, [socket,token])

//sockets use effect
    useEffect(()=> {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

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
            }else{
                setTasks(prevTasks => [...prevTasks, data])
                const successToast = {
                    title: 'Success',
                    description: 'Task added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
            }
        })

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
            }else{
                if(tasks){
                    setTasks(prevTasks => prevTasks.filter(item => item._id !== data._id))
                }
                const successToast = {
                    title: 'Success',
                    description: 'Task deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
            }
        })

        return(() => {
            socket.removeAllListeners()
        })
    },[socket, tasks])


    const onSubmit = (e) => {
        e.preventDefault()
        const newTask = {
                createdBy: createdBy,
                assignedTo: assignedTo,
                roomId: decoded.roomId,
                asset: assignedAsset,
                status: status,
                desc: desc
            }

            socket.emit('addTask', newTask)
            toggle()

            setCreatedBy('')
            setAssignedTo('None')
            setDesc('')
    }

    useEffect(() => {
        const getTasks = () => {
            getAllTasks(realToken.current).then(res => {
                var newArrayTaskofObject = Object.values(res.tasksArray)
                setTasks(newArrayTaskofObject)
            })
            .catch(err => console.log(err))
        }
        getTasks()
    }, [])

    //useeffect to get the assets to fill out modal
    useEffect(() => {
        const getAssets = () => {
            console.log('this is in the getassets')
            getAll(realToken.current).then(res => {
                var newArrayAssetofObject = Object.values(res.assetsArray)
                setAssets(newArrayAssetofObject)
            })
            .catch(err => console.log(err))
        };
        getAssets()
    }, []);

   

    //renders the task
    const renderTasks = (filteredTask) => {
        return (
            <div key={filteredTask._id}>
                <TasksContainer task={filteredTask} assets={assets} tasks={tasks} setTasks={setTasks} socket={socket}/>
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
