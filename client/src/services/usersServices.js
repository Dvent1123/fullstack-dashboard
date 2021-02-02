import axios from 'axios'

export const getAllUsers = async () => {
    let res = await axios.get('http://localhost:5000/users')
    return res.data || []
}

export const createUser = async (newUser) => {
     let res = await axios.post('http://localhost:5000/users/new', newUser)
            return res.data || []
}
