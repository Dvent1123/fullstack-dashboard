import React, {useState, useEffect}  from 'react'
import HomeContainerAssets from '../Helpers/HomeContainerAssets'
import { assetData } from '../../Models/asset-data'
import Modal from '../Helpers/Modal/Modal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { AiFillPlusCircle } from 'react-icons/ai'

const HomeAssets = () => {
    const [assets, setAssets] = useState([])
    const {isShown, toggle} = ModalContainer()
    const [name, setName] = useState('')
    const [status, setStatus] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        setAssets(assetData)
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        setName('')
        setStatus(0)
        setLocation('')
        setDescription('')
        console.log(name, status, location, description)
    }


    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Assets</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <Modal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                setName={setName} name={name}
                setStatus={setStatus} status={status}
                setLocation={setLocation} location={location}
                setDescription={setDescription} description={description}/>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Immediate Action</h2>
                    </div>
                        {
                            assets.filter(asset => asset.status === 1).map(filteredAsset => {
                                return (
                                    <div key={filteredAsset.id}>
                                        <HomeContainerAssets asset={filteredAsset}/>
                                    </div>
                                )
                            })
                        }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Needs Service</h2>
                    </div>
                    {
                            assets.filter(asset => asset.status === 2).map(filteredAsset => {
                                return (
                                    <div key={filteredAsset.id}>
                                        <HomeContainerAssets asset={filteredAsset}/>
                                    </div>
                                )
                            })
                        }
                </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>All Assets</h2>
                    </div>
                        <div>
                            {
                            assets.map((asset) => {
                                return (
                                    <div key={asset.id}>
                                        <HomeContainerAssets asset={asset}/>
                                     </div>
                                    )
   
                                })
                            }
                        </div>
                </section>
            </section>
    )
}

export default HomeAssets
