import React, {useState, useEffect} from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import HomeContainerTasks from '../Helpers/HomeContainerTasks'
import { taskData } from '../../Models/task-data'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import ModalTasks from '../Helpers/Modal/ModalTasks'
import axios from 'axios'

const HomeTasks = () => {
    const [tasks, setTasks] = useState([])
    const {isShown, toggle} = ModalContainer()
    const [assignedTo, setAssignedTo] = useState('None')
    const [assetName, setAssetName] = useState('None')
    const [desc, setDesc] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

    const newTask = {
        //createdBy
        //asset obj that it is referencing
        //status
            assignedTo: assignedTo,
            desc: desc
        }

        axios.post('http://localhost:5000/tasks/new', newTask)
            .then(res => console.log(res.data))

        setAssignedTo('None')
        setAssetName('None')
        setDesc('')
    }

    useEffect(() => {
        setTasks(taskData)
    },[])
    
    // Remember to pass in users to userModal
    // useEffect(()=> {
    //     setUsers(userData)
    // },[])
    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Tasks</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <ModalTasks isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                assetName={assetName} setAssetName={setAssetName} 
                desc={desc} setDesc={setDesc}/>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Not Complete</h2>
                    </div>
                        {
                            tasks.filter(task => task.status === 1).map(filteredTask => {
                                return (
                                    <div key={filteredTask.id}>
                                        <HomeContainerTasks task={filteredTask}/>
                                    </div>
                                )
                            })
                        }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>In Progress</h2>
                    </div>
                    {
                            tasks.filter(task => task.status === 2).map(filteredTask => {
                                return (
                                    <div key={filteredTask.id}>
                                        <HomeContainerTasks task={filteredTask}/>
                                    </div>
                                )
                            })
                        }
                </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Pending Approval</h2>
                    </div>
                        {
                            tasks.filter(task => task.status === 3).map(filteredTask => {
                                return (
                                    <div key={filteredTask.id}>
                                        <HomeContainerTasks task={filteredTask}/>
                                    </div>
                                )
                            })
                        }
                </section>
            </section>
    )
}

export default HomeTasks
