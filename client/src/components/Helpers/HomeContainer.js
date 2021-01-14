import React from 'react'

const HomeContainer = ({task}) => {
    const {id, createdBy} = task
    return (
        <section className="home-container">
            <div className="container-center">
                <h2>ID: {id}</h2>
                <h2>Asset Name: </h2>
                <h2>Description: </h2>
            </div>
        </section>
    )
}

export default HomeContainer
