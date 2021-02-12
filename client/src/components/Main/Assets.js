import React, {useState, useEffect}  from 'react'
import AssetsContainer from '../Helpers/AssetsContainer'
import Modal from '../Helpers/Modal/Modal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { AiFillPlusCircle } from 'react-icons/ai'
import {getAll} from '../../services/assetsService'
import {socket} from '../NavBar'

const Assets = () => {
    const [assets, setAssets] = useState(null)
    const {isShown, toggle} = ModalContainer()
    const [name, setName] = useState('')
    const [status, setStatus] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

   //gets the assets using the services
  const getAssets = async () => {
        let res = await getAll()
        setAssets(res.assetsArray)
  };

  //toggles the success messsage

  //THIS IS IMPORTANT, HANDLE 'data' WHICH COULD BE SUCCESSFUL OR AN ERROR
  //IF AN ERROR HANDLE THAT AND IF SUCCESSFUL HANDLE THAT
  const newAssetFunction = () => {
        socket.on('AssetAdded', (result) => {
            const {data, success} = result 
            if(!success) {
                //gets rid of the modal
                toggle()
            }else{
                setAssets([...assets, data])
                toggle()
            }
        })
  }


  //this useEffect is fine because it will only retrieve assets upon initial render not re-renders
  //since it already got those assets
  useEffect(() => {
      if(!assets){
        getAssets();
      }
  });

//Handles form submit for new asset
    const onSubmit = (e) => {
        e.preventDefault()

        const newAsset = {
            name: name,
            status: status,
            location: location,
            desc: description
        }
 
        socket.emit('addAsset', newAsset)
        newAssetFunction()

        setName('')
        setStatus(0)
        setLocation('')
        setDescription('')
    }



    //renders the assets
    const renderAssets = (filteredAsset) => {
        return (
            <div key={filteredAsset._id}>
                <AssetsContainer asset={filteredAsset} assets={assets} setAssets={setAssets}/>
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
                                        <p>No Assets found</p>
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
                                        <p>No Assets found</p>
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
                                        <p>No Assets found</p>
                                    )}
                                </div>
                    </section>
            </section>
    )
}

export default Assets
