import React from 'react'

const HomeContainerUsers = ({user}) => {
    const {id, username, job} = user

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>ID: {id} </h3>
                <h3>Name: {username} </h3>
                <h3>Specialty: {job}</h3>
            </div>
        </section>
    )
}

export default HomeContainerUsers
