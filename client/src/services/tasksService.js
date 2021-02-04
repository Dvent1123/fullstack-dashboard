import axios from 'axios'

export const getAllTasks = async () => {
    let res = await axios.get('http://localhost:5000/tasks')
    return res.data || []
}

export const createTask = async (newTask) => {
     let res = await axios.post('http://localhost:5000/tasks/new', newTask)
            return res.data || []
}

export const deleteTask = async (id) => {
    let res = await axios.delete(`http://localhost:5000/tasks/delete/${id}`)
        return res.data || []
}
