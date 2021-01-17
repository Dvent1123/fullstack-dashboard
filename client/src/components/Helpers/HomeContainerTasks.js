import React from 'react'
import {IoCheckmarkCircleSharp} from 'react-icons/io5'


const HomeContainerTasks = ({task}) => {
    const {assignedTo, desc, assetLocation} = task

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>Assigned To: {assignedTo} </h3>
                <h3>Task: {desc} </h3>
                <h3>Location: {assetLocation}</h3>
                <IoCheckmarkCircleSharp size={'50px'}/>
            </div>
        </section>
    )
}

export default HomeContainerTasks
