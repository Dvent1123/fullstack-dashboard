import React from 'react'

const UserItems = ({prop}) => {
    const {id, name} = prop

    return (
        <section className="user-container">
            <div className="user-name"><h2>Name: {name}</h2></div>
            <div className="user-id"><h2>ID: {id}</h2></div>
        </section>
    )
}

export default UserItems
