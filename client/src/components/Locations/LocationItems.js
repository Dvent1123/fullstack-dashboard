import React from 'react'

const LocationItems = ({prop}) => {
    const {location, issues, id} = prop

    return (
        <section className="location-container">
            <div className="location-name"><h2>Name: {location}</h2></div>
            <div className="location-issues"><h2>Name: {issues}</h2></div>
            <div className="location-id"><h2>ID: {id}</h2></div>
        </section>
    )
}

export default LocationItems
