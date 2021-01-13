import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import LocationItems from './LocationItems'
import { locationData } from '../../Models/location-data'

const Locations = () => {
    const [locations, setLocations] = useState(locationData)

    return (
        <div className='locations-container'>
            <div className='locations-title'><h1>You are in the Locations Page</h1></div>
                <section className="location-items-container">
                        {locations.map((location) => {
                            return (
                                <div key={location.id}>
                                <Link to={`/locations/${location.id}`} className="nav-location">
                                    <LocationItems prop={location} />
                                </Link>
                                </div>
                            )
                        })}
                </section>
        </div>
    )
}

export default Locations
