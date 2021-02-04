import axios from 'axios'

export const getAll = async () => {
    let res = await axios.get('http://localhost:5000/assets')
    return res.data || []
}

export const createAsset = async (newAsset) => {
     let res = await axios.post('http://localhost:5000/assets/new', newAsset)
            return res.data || []
}

export const deleteAsset = async (id) => {
    let res = await axios.delete(`http://localhost:5000/assets/delete/${id}`)
        return res.data || []
}