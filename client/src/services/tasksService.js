import axios from 'axios'

export const getAllTasks = async () => {
    let res = await axios.get('http://localhost:5000/tasks')
    return res.data || []
}
