import React, {useState, useEffect} from 'react'
import HomeContainer from '../Helpers/HomeContainer'
import { assetData } from '../../Models/asset-data'
import { taskData } from '../../Models/task-data'


const Home = () => {
    const [assets, setAssets] = useState(assetData)
    const [tasks, setTasks] = useState(taskData)
    const [notComplete, setNotComplete] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [pending, setPending] = useState([])

    //we know what the not complete, in progress, and pending codes are
    //we can make a function that takes in the code and then returns a new array
    const newTasks = (status) => {
        return tasks.map((task) => task.status === status)
    }


    useEffect(() => {
        setNotComplete(newTasks(1))
        setInProgress(newTasks(2))
        setPending(newTasks(3))
    },[])


    //the problemof why this isn't working is because it renders and then updates the tasks but it only updates it once
    //in the use effect it only does this once so by the time it renders it's already over and done
    return (
        <div className="home-container">
            <div>
                <h1>You are in the home page</h1>
            </div>
            <section className="tasks-task-container">
                <div className="tasks-title">
                    <h1>Tasks</h1>
                </div>
                <section className="task-notcomplete-container">
                    <div className="task-notcomplete-title">
                        <h1>Not Complete</h1>
                    </div>
                    {
                        notComplete.map((task) => {
                            return(
                                    <div key={task.id}>
                                        <HomeContainer task={task} />
                                    </div>                
                            )
                        })
                    }
                    </section>
                <section className="task-inprogress-container">
                    <div className="task-inprogress-title">
                        <h1>In Progress</h1>
                    </div>
                    {
                         inProgress.map((task) => {
                            return(
                                <div key={task.id}></div>
                            )
                        })
                    }
                </section>
                <section className="task-pending-container">
                    <div className="task-pending-title">
                        <h1>Pending Approval</h1>
                    </div>
                    {
                         pending.map((task) => {
                            return(
                                <div key={task.id}></div>
                            )
                        })
                    }
                </section>
            </section>
        </div>


    )
}

export default Home