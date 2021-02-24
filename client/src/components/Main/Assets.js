import React, {useState, useContext,useEffect, useRef}  from 'react'
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
import jwt_decode from 'jwt-decode'
import {SocketContext} from '../../services/socketService'


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
    const [decoded, setDecoded] = useState('')
    const { token } = useToken()
    let realToken = useRef()
    const socket = useContext(SocketContext)

    useEffect(() => {
        let timer = setTimeout(() => setLoading(false), 6000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(()=> {
        const parseToken = JSON.parse(token)
        realToken.current = parseToken.token
        setDecoded(jwt_decode(realToken.current))
        socket.emit('subscribe', jwt_decode(realToken.current).roomId)

        return(() => {
            socket.emit('unsubscribe', jwt_decode(realToken.current).roomId)
            socket.removeAllListeners()
        })
    },[socket, token])



//this is where we'll have our socket stuff
useEffect(() => {
        socket.on('joined', message =>{ 
            console.log(message)
        })

        socket.on('left', message => console.log(message))

        socket.on('AssetAdded', (result) => {
            console.log('this is in the get assets')
            const {data, success} = result 
            if(!success) {
                const errorToast = {
                title: 'Danger',
                description: 'There was an error :(',
                backgroundColor: '#d9534f',
                icon: errorIcon
                }

                setToast(errorToast)
            }else{
                setAssets(prevAssets => [...prevAssets, data])
                const successToast = {
                    title: 'Success',
                    description: 'Asset added!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }
                //need to get rid of these and add them somewhere else
                setToast(successToast)
            }
        })

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
            }else{
                if(assets){
                    setAssets(prevAssets => prevAssets.filter(item => item._id !== data._id))
                }

                const successToast = {
                    title: 'Success',
                    description: 'Asset deleted!',
                    backgroundColor: '#5cb85c',
                    icon: checkIcon
                }                
                setToast(successToast)
            }}
        )

    return(() => {
        socket.removeAllListeners()
    })
},[socket, assets])


  useEffect(() => {
    const getAssets = () => {
        getAll(realToken.current).then(res => {
            //makes the object we are returned into an array
            var newArrayAssetofObject = Object.values(res.assetsArray)
            setAssets(newArrayAssetofObject)
        })
        .catch(err => console.log(err))
    }
    getAssets()
  },[]);


//Handles form submit for new asset
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(decoded.roomId + ' this is the submit')

        const newAsset = {
            name: name,
            status: status,
            roomId: decoded.roomId,
            location: location,
            desc: description
        }
 
        socket.emit('addAsset', newAsset)

        toggle()

        setName('')
        setStatus(0)
        setLocation('')
        setDescription('')
    }

    // renders the assets
    const renderAssets = (filteredAsset) => {
        return (
            <div key={filteredAsset._id}>
                <AssetsContainer asset={filteredAsset} assets={assets} setAssets={setAssets} socket={socket}/>
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
                                        assets.map(filteredAsset => {
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
