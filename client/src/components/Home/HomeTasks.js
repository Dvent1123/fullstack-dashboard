import React from 'react'
import HomeContainer from '../Helpers/HomeContainer'

const HomeTasks = ({tasks}) => {

    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Tasks</h1>
                </div>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Not Complete</h2>
                    </div>
                        {
                            tasks.filter(task => task.status === 1).map(filteredTask => {
                                return (
                                    <div key={filteredTask.id}>
                                        <HomeContainer item={filteredTask}/>
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
                                        <HomeContainer item={filteredTask}/>
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
                                        <HomeContainer item={filteredTask}/>
                                    </div>
                                )
                            })
                        }
                </section>
            </section>
    )
}

export default HomeTasks
