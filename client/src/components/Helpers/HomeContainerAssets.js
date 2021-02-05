import React, {useState} from 'react'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import ModalContainerAssets from '../Helpers/Modal/ModalContainerAssets'
import ModalFromAssets from '../Helpers/Modal/ModalFromAssets'
import Modal from '../Helpers/Modal/Modal'
import { BsPersonPlusFill } from "react-icons/bs";
import {deleteAsset, editAsset} from '../../services/assetsService'

const HomeContainerAssets = ({asset}) => {
    const {name, desc, location, status, _id} = asset
    const [assetName, setAssetName] = useState(name)
    const [assetDesc, setAssetDesc] = useState(desc)
    const [assetLocation, setAssetLocation] = useState(location)
    const [assetStatus, setAssetStatus] = useState(status)
    const [id, setId] = useState(_id)
    //code for Modal
    const {isShown, toggle} = ModalContainer()
    const [assignedTo, setAssignedTo] = useState('None')
    const [description, setDescription] = useState('')
    const {isShownAssets, toggleAssets} = ModalContainerAssets()

    const removeAsset = async() => {
        let res = await deleteAsset(id)
        console.log(res.asset)
        //need to refresh the page here
    }

    const updateAsset = async (assetObj) => {
        let res = await editAsset(assetObj, id)
        console.log(res)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const newAsset = {
            name: assetName,
            status: assetStatus,
            location: assetLocation,
            desc: assetDesc
        }

        //if this doesn't come back with an error then 
        //gucci gang, if it does than we'll have to
        //make an error thing to say there was an error
        updateAsset(newAsset)

        setAssetName('')
        setAssetStatus(0)
        setAssetLocation('')
        setAssetDesc('')
    }


    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>Asset Name: {name}</h3>
                <h3>Description: {desc} </h3>
                <h3>Location: {location}</h3>
                <button className="default-button" onClick={toggleAssets}>Edit</button>
                <button className="button-default" onClick={toggle}><BsPersonPlusFill size={'25px'}/></button>
                <button onClick={removeAsset}>Delete</button>
            </div>
                <ModalFromAssets isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                assetName={name}
                description={description} setDescription={setDescription}/>
                
                <Modal isShowing={isShownAssets} hide={toggleAssets} onSubmit={onSubmit} 
                setName={setAssetName} name={assetName}
                setStatus={setAssetStatus} status={assetStatus}
                setLocation={setAssetLocation} location={assetLocation}
                setDescription={setAssetDesc} description={assetDesc}/>
        </section>
    )
}

export default HomeContainerAssets
