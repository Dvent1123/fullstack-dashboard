import React, {useState, useEffect}  from 'react'
import HomeContainerAssets from '../Helpers/HomeContainerAssets'
import Modal from '../Helpers/Modal/Modal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { AiFillPlusCircle } from 'react-icons/ai'
import axios from 'axios'
import getAll from '../../services/assetsService'

const HomeAssets = () => {
    const [assets, setAssets] = useState([])
    const {isShown, toggle} = ModalContainer()
    const [name, setName] = useState('')
    const [status, setStatus] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    //gets the assets using the services
  const getAssets = async () => {
        let res = await getAll()
        console.log(res)
        setAssets(res)
  };

  useEffect(() => {
      if(!assets){
        getAssets();
      }
  }, [assets]);


//Handles form submit for new asset
    const onSubmit = (e) => {
        e.preventDefault()

        const newAsset = {
            name: name,
            status: status,
            location: location,
            desc: description
        }

        axios.post('http://localhost:5000/assets/new', newAsset)
            .then(res => console.log(res.data))

        setName('')
        setStatus(0)
        setLocation('')
        setDescription('')
    }

    //renders the assets
    const renderAssets = (filteredAsset) => {
        return (
            <div key={filteredAsset.id}>
                <HomeContainerAssets asset={filteredAsset}/>
            </div>
        )
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
                                <div className="assets">
                                    {(assets && assets.length > 0) ? (
                                        assets.filter(asset => asset.status === 1).map(filteredAsset => {
                                         return renderAssets(filteredAsset)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No products found</p>
                                    )}
                                </div>
                    </section>
                    <section className="section-container">
                    <div className="section-title">
                        <h2>Needs Service</h2>
                    </div>                              
                                <div className="assets">
                                    {(assets && assets.length > 0) ? (
                                        assets.filter(asset => asset.status === 2).map(filteredAsset => {
                                         return renderAssets(filteredAsset)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No products found</p>
                                    )}
                                </div>
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>All Assets</h2>
                    </div>                              
                                <div className="assets">
                                    {(assets && assets.length > 0) ? (
                                        assets.filter(asset => asset.status === 1).map(filteredAsset => {
                                         return renderAssets(filteredAsset)
                                        })
                                    ) : (
                                        //come back and change this to something else
                                        <p>No products found</p>
                                    )}
                                </div>
                    </section>
            </section>
    )
}

export default HomeAssets
