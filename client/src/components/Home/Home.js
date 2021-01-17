import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

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






    //the problemof why this isn't working is because it renders and then updates the tasks but it only updates it once
    //in the use effect it only does this once so by the time it renders it's already over and done
    return (
        <div className="home-container">
            <div className="nav-container">
            <ul className="nav-inner">
                <li className="nav-item">
                <Link to="/assets" className="nav-link">Assets</Link>
                </li>
                <li className="nav-item">
                <Link to="/tasks" className="nav-link">Tasks</Link>
                </li>
                <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
                </li>
            </ul>
            </div>
            {/* {
                <HomeTasks tasks={tasks}/>

            }
            {
                <HomeAssets assets={assets} />
            }
            {
                <HomeUsers users={users} />
            } */}
        </div>


    )
}

export default Home