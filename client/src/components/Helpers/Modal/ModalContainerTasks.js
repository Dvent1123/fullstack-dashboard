import {useState} from 'react'

const ModalContainer = () => {
    const [isShownTasks, setIsShownTasks] = useState(false)

    function toggleTasks() {
        setIsShownTasks(!isShownTasks)
    }

    return{
        isShownTasks, toggleTasks
    }
}

export default ModalContainer
