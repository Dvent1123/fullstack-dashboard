import React from 'react'

const HomeContainer = ({item}) => {
    const {id} = item

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>ID: {id}</h3>
                <h3>Asset Name: </h3>
                <h3>Description: </h3>
            </div>
        </section>
    )
}

export default HomeContainer
