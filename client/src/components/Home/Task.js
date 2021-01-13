import React from 'react'

const Task = () => {
    return (
        <section className="task-container">
            <div className="task-num"><h2>#2</h2></div>
            <div className="task-desc"><h2>Description</h2></div>
            <div className="task-btn-container">
                <button className="delete">Delete</button>
                <button className="completed">Completed</button>
            </div>
        </section>
    )
}

export default Task
