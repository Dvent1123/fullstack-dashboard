import axios from 'axios'

export const getAll = async (token) => {
    let res = await axios.get('http://localhost:5000/assets', { 
        headers: { Authorization: `Bearer ${token}`}})
    return res.data || []
}
