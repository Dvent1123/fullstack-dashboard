const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Assets', assetSchema)