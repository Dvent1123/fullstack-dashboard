import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import  { assetData } from '../../Models/asset-data'


const Asset = () => {
    const [name, setName] = useState('no name')
    const { id } = useParams()

    useEffect(()=> {
        const newAsset = assetData.find((asset)=> asset.id === parseInt(id))
        setName(newAsset.name)
    },[id])

    return (
    <div>
      <h1>{name}</h1>
      <Link to='/assets' className='btn'>
        Back To All Assets
      </Link>
    </div>
    )
}

export default Asset
