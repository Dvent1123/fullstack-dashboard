const mongoose = require('mongoose')
const User = require('../models/Users')

exports.getUsers = async (req, res) => {
    let usersArray = []
    try{
        usersArray = await User.find({})
        return res.status(201).send({
            error: false,
            usersArray
        })
    }catch{
        res.status(500).send({
            error: true
        })
    }
}

exports.newUser= async (io, userFromServer) => {
    const ioUser =  userFromServer
    let result

        const newUser = new User({
            username: ioUser.username,
            password: ioUser.password,
            role: ioUser.role,
            job: ioUser.job
        })
        
        newUser.save((err, user) => {
        if(err) {
            result = {success: false, error: err}
            console.log(result)
        }else{
            result = {success: true, data: user}
            io.emit('UserAdded', result)
        }   
        })

}

exports.updateUser = async (io, userFromServer) => {
    const id = userFromServer.id
    let newUser = userFromServer
    let result

        let user = await User.findById(id)
            user.username = newUser.username,
            user.password = newUser.password,
            user.role = newUser.role,
            user.job = newUser.job

            user.save((err, updatedUser) => {
                if(err){
                    result = {success: false, error: err}
                    console.log(result)                    
                }else{
                    result = {success: true, data: updatedUser}
                    io.emit('UserUpdated', result)
                }
            })

}


exports.deleteUser = async (io, id) => {
        let user = await User.findById(id)
        let result
        user.remove((err, deletedUser) => {
            if(err) {
                result = {success: false, error: err}
                console.log(result)            
            }else {
                result = {success: true, data: deletedUser}
                io.emit('UserDeleted', result)  
            }            
        })
}
