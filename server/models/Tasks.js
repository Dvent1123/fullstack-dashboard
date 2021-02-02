const mongoose = require('mongoose')
const Asset =  require('./Assets').schema

const taskSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    status: {
        type: Number, 
        required: true
    },
    desc: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Tasks', taskSchema)