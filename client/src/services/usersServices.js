import axios from 'axios'

export const getAllUsers = async () => {
    let res = await axios.get('http://localhost:5000/users')
    return res.data || []
}
