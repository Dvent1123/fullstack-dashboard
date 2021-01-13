import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { locationData } from '../../Models/location-data'

const Location = () => {
    const [location, setLocation] = useState({})
    const {id} = useParams()

    useEffect(()=>{
        const newLocation = locationData.find((location) => location.id === parseInt(id))
        setLocation(newLocation)
    }, [id])

    return (
        <div>
            <h1>You are in the {location.location} location page</h1>
            <Link to='/locations'>Back to All Locations</Link>
        </div>
    )
}

export default Location
