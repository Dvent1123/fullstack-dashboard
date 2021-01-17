import React, {useState} from 'react'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import ModalFromAssets from '../Helpers/Modal/ModalFromAssets'
import { BsPersonPlusFill } from "react-icons/bs";

const HomeContainerAssets = ({asset}) => {
    const {name, desc, location} = asset
    const {isShown, toggle} = ModalContainer()
    const [assignedTo, setAssignedTo] = useState('None')
    const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        //once a person has been assigned to this asset then it gets taken off the immediate action list
        //so have to update that list
        e.preventDefault()
         console.log(assignedTo, description)
        setAssignedTo('None')
        setDescription('')
    }

    return (
        <section className="second-home-container">
            <div className="second-container-center">
                <h3>Asset Name: {name}</h3>
                <h3>Description: {desc} </h3>
                <h3>Location: {location}</h3>
                <button className="button-default" onClick={toggle}><BsPersonPlusFill size={'25px'}/></button>
            </div>
                <ModalFromAssets isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                assignedTo={assignedTo} setAssignedTo={setAssignedTo}
                assetName={name}
                description={description} setDescription={setDescription}/>
        </section>
    )
}

export default HomeContainerAssets
