import React, {useState} from 'react'
import ModalContainer from './Modal/ModalContainer'
import AssetsModal from './Modal/AssetsModal'
import Modal from './Modal/Modal'
import { BsPersonPlusFill } from "react-icons/bs";
import {socket} from '../NavBar'

const AssetsContainer = ({asset, assets, setAssets}) => {
    const {name, desc, location, status, _id} = asset
    const [assetName, setAssetName] = useState(name)
    const [assetDesc, setAssetDesc] = useState(desc)
    const [assetLocation, setAssetLocation] = useState(location)
    const [assetStatus, setAssetStatus] = useState(status)
    //code for Modal
    const {isShown, toggle} = ModalContainer()
    const {isShown: isShownAssets,toggle: toggleAssets} = ModalContainer()
    const [assignedTo, setAssignedTo] = useState('None')
    const [description, setDescription] = useState('')


    //sends the asset to remove
    const removeAsset = async() => {
        socket.emit('deleteAsset', _id)
        assetRemovalReturn()
    }

    //handling the return from remove asset
    const assetRemovalReturn = async () => {
        socket.on('AssetDeleted', (result) => {
            const {data, success} = result 
            if(!success) {
                //handle error here
            }else{
                const arrayAfterDeletion = assets.filter(item => item._id !== _id)
                setAssets(arrayAfterDeletion)
            }}
        )
    }

    const updateAsset = async () => {
        socket.on('AssetUpdated', (result) => {
            const {data, success} = result
            if(!success){
                //handles error
            }else{
                const assetIndex = assets.findIndex(item => item._id === _id)
                const updatedAssetsArray = [...assets]
                updatedAssetsArray[assetIndex] = data
                setAssets(updatedAssetsArray)
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const newAsset = {
            id: _id,
            name: assetName,
            status: assetStatus,
            location: assetLocation,
            desc: assetDesc
        }

        //emits this new asset to the server
        socket.emit('updateAsset', newAsset)
        updateAsset()

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
                <AssetsModal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
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

export default AssetsContainer
