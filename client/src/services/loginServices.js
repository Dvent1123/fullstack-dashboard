import axios from 'axios'

export const registerUser = async (user) => {
    let res = await axios.post('http://localhost:5000/login/signup', user)
    return res.data || []
}

export const loginUser = async (user) => {
    let res = await axios.post('http://localhost:5000/login/signin', user)
    return res.data || []
}