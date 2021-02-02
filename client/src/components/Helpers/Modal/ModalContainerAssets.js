import {useState} from 'react'

const ModalContainer = () => {
    const [isShownAssets, setIsShownAssets] = useState(false)

    function toggleAssets() {
        setIsShownAssets(!isShownAssets)
    }

    return{
        isShownAssets, toggleAssets
    }
}

export default ModalContainer
