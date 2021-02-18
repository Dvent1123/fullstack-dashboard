import axios from 'axios'

export const getAllUsers = async (token) => {
    let res = await axios.get('http://localhost:5000/users', {
      headers: { Authorization: `Bearer ${token}`}  
    })
    return res.data || []
}
