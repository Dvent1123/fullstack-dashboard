import React, {useState, useEffect}  from 'react'
import AssetsContainer from '../Helpers/AssetsContainer'
import Modal from '../Helpers/Modal/Modal'
import ModalContainer from '../Helpers/Modal/ModalContainer'
import { AiFillPlusCircle } from 'react-icons/ai'
import {getAll} from '../../services/assetsService'
import Toast from '../Toast/Toast'
import checkIcon from '../../assets/check.svg'
import errorIcon from '../../assets/error.svg';
import Loading from '../Helpers/Loading'
import Nav from '../Main/Nav'
import useToken from '../../utils/useToken'
import {socket} from '../Main/Home'


    // case 'info':
    //     toastProperties = {
    //         id,
    //         title: 'Info',
    //         description: 'This is an info toast component',
    //         backgroundColor: '#5bc0de',
    //         icon: infoIcon
    //     }
    //     break;
    // case 'warning':
    //     toastProperties = {
    //         id,
    //         title: 'Warning',
    //         description: 'This is a warning toast component',
    //         backgroundColor: '#f0ad4e',
    //         icon: warningIcon
    //     }

const Assets = () => {
    const [assets, setAssets] = useState(null)
    const {isShown: isShownToast,toggle: toggleToast} = ModalContainer()
    const {isShown, toggle} = ModalContainer()
    const [name, setName] = useState('')
    const [status, setStatus] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [toast, setToast] = useState(null)
    const [loading, setLoading] = useState(true)
    const { token } = useToken()

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

   //gets the assets using the services
  const getAssets = async () => {
        const parseToken = JSON.parse(token)
        let res = await getAll(parseToken.token)
        setAssets(res.assetsArray)
  };

  //toggles the success messsage

  //THIS IS IMPORTANT, HANDLE 'data' WHICH COULD BE SUCCESSFUL OR AN ERROR
  //IF AN ERROR HANDLE THAT AND IF SUCCESSFUL HANDLE THAT
  const newAssetFunction = async () => {
        socket.on('AssetAdded', (result) => {
            const {data, success} = result 
            if(!success) {
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
                setAssets([...assets, data])
                const successToast = {
                    title: 'Success',
                    description: 'Asset added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                setToast(successToast)
                toggle()
                toggleToast()
            }
        })
  }


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
                <Nav />
                <div className="section-title">
                    <h1>Assets</h1>
                    <button className="button-default" onClick={toggle}><AiFillPlusCircle size={'40px'}/></button>
                </div>
                <Modal isShowing={isShown} hide={toggle} onSubmit={onSubmit} 
                setName={setName} name={name}
                setStatus={setStatus} status={status}
                setLocation={setLocation} location={location}
                setDescription={setDescription} description={description}/>
                <Toast toast={toast} position={'bottom-right'} isShowing={isShownToast} hide={toggleToast}/>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Immediate Action</h2>
                    </div>                              
                    {   loading === false ?           
                        (  <div className="assets">
                                {(assets && assets.length > 0) ? (
                                    assets.filter(asset => asset.status === 1).map(filteredAsset => {
                                        return renderAssets(filteredAsset)
                                    })
                                ) : (
                                    //come back and change this to something else
                                    <p>No Assets found</p>
                                )}
                            </div>
                        ) : (
                            <Loading />
                        )
                    }
                    </section>
                    <section className="section-container">
                    <div className="section-title">
                        <h2>Needs Service</h2>
                    </div>                              
                        { loading === false ?  
                            (<div className="assets">
                                {(assets && assets.length > 0) ? (
                                    assets.filter(asset => asset.status === 2).map(filteredAsset => {
                                        return renderAssets(filteredAsset)
                                    })
                                ) : (
                                    //come back and change this to something else
                                    <p>No Assets found</p>
                                )}
                            </div>) :
                            (
                                <Loading />
                            )
                        }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>All Assets</h2>
                    </div>                              
                        {   loading === false ? 
                            (
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
                            ) : (
                                <Loading />
                            )
                        }
                    </section>
            </section>
    )
}

export default Assets
