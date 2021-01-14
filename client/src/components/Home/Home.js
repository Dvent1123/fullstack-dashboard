import React, {useState, useEffect} from 'react'
import HomeContainer from '../Helpers/HomeContainer'
import { assetData } from '../../Models/asset-data'
import { taskData } from '../../Models/task-data'
import HomeTasks from './HomeTasks'
import HomeAssets from './HomeAssets'

const Home = () => {
    const [assets, setAssets] = useState([])
    const [tasks, setTasks] = useState([])

    //FOLLOW THIS EXAMPLE WHEN FETCHING FROM THE API
//   const [users, setUsers] = useState([]);
//   const getUsers = async () => {
//     const response = await fetch(url);
//     const users = await response.json();
//     setUsers(users);
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);



    useEffect(() => {
        setAssets(assetData)
    },[])
    useEffect(() => {
        setTasks(taskData)
    },[])

    //the problemof why this isn't working is because it renders and then updates the tasks but it only updates it once
    //in the use effect it only does this once so by the time it renders it's already over and done
    return (
        <div className="home-container">
            <div>
                <h1>You are in the home page</h1>
            </div>
            {
                <HomeTasks tasks={tasks}/>

            }
            {
                <HomeAssets assets={assets} />
            }
        </div>


    )
}

export default Home