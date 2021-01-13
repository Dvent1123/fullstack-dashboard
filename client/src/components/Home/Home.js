import React from 'react'
import Pending from './Pending'
import Tasks from './Tasks'

const Home = () => {
    return (
        <div className="home-container">
            <div>
                <h1>You are in the home page</h1>
            </div>
            <section className="tasks-task-container">
                <div className="tasks-title">
                    <h1>Tasks</h1>
                </div>
                <Tasks />
            </section>
            <section className="pending-task-container">
                <div className="pending-title">
                    <h1>Pending</h1>
                </div>
                <Pending />
            </section>
        </div>


    )
}

export default Home