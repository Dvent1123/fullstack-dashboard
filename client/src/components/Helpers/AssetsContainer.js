import React, {useState} from 'react'
import ModalContainer from './Modal/ModalContainer'
import AssetsModal from './Modal/AssetsModal'
import Modal from './Modal/Modal'
import { BsPersonPlusFill } from "react-icons/bs";
import {socket} from '../Main/Home'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';

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

    const [taskStatus, setTaskStatus] = useState(0)
    
    const [toast, setToast] = useState(null)
    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()


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
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }
                
                setToast(errorToast)
                toggleToast()
            }else{
                const arrayAfterDeletion = assets.filter(item => item._id !== data._id)
                setAssets(arrayAfterDeletion)

                const successToast = {
                    title: 'Success',
                    description: 'Asset deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }                
                setToast(successToast)
                toggleToast()
            }}
        )
    }

    const updateAsset = async () => {
        socket.on('AssetUpdated', (result) => {
            const {data, success} = result
            if(!success){
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }
                
                setToast(errorToast)
                toggleAssets()
                toggleToast()
            }else{
                
                const assetIndex = assets.findIndex(item => item._id === data._id)
                const updatedAssetsArray = [...assets]
                updatedAssetsArray[assetIndex] = data
                setAssets(updatedAssetsArray)

                const successToast = {
                    title: 'Success',
                    description: 'Asset updated!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggleAssets()
                toggleToast()
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
    }

    const newTaskFunction = async () => {
        socket.on('TaskAdded', (result) => {
            const {data, success} = result
            if(!success){
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)
                toggle()
                toggleToast()
            }else{
                const successToast = {
                    title: 'Success',
                    description: `Task was assigned to ${data.asset}!`,
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()
            }
        })
    }

    const onSubmitAssignTask = (e) => {
        e.preventDefault()

        const newTask = {
                createdBy: 'User ID will go here',
                assignedTo: assignedTo,
                //below is the asset name of the asset we are assigning a task to
                asset: assetName,
                status: taskStatus,
                desc: description
            }

        //emits this new task to the server
        socket.emit('addTask', newTask)
        newTaskFunction()
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
                <AssetsModal isShowing={isShown} hide={toggle} onSubmit={onSubmitAssignTask} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                assetName={name} status={taskStatus} setStatus={setTaskStatus}
                description={description} setDescription={setDescription} assets={assets}/>
                
                <Modal isShowing={isShownAssets} hide={toggleAssets} onSubmit={onSubmit} 
                setName={setAssetName} name={assetName}
                setStatus={setAssetStatus} status={assetStatus}
                setLocation={setAssetLocation} location={assetLocation}
                setDescription={setAssetDesc} description={assetDesc}/>
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
        </section>
    )
}

export default AssetsContainer
