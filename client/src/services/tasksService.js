import axios from 'axios'

export const getAllTasks = async (token) => {
    let res = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}`}
    })
    return res.data || []
}
