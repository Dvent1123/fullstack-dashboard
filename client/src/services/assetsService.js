import axios from 'axios'

export default {
    getAll: async () => {
        let res = await axios.get('http://localhost:5000/assets')
        return res.data || []
    }
}