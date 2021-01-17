import {useState} from 'react'

const ModalContainer = () => {
    const [isShown, setIsShown] = useState(false)

    function toggle() {
        setIsShown(!isShown)
    }

    return{
        isShown, toggle
    }
}

export default ModalContainer
