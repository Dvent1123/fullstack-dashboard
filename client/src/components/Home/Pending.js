import React from 'react'
import Task from './Task'

const Pending = () => {
    return (
        <section className="pending-container">
            <Task />
            <Task />
            <Task />
        </section>
    )
}

export default Pending
