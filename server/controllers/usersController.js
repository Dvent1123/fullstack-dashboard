const mongoose = require('mongoose')
const User = require('../models/Users')
const passport = require('passport')

exports.getUsers = async (req, res) => {
    passport.authenticate('jwt', {session: false}, async (err, user,info) => {
        if(err) {
            console.log(err)
        }
        if(info != undefined) {
            console.log(info.message)
            res.send(info.message)
        }else {
            let usersArray = []
            try{
                usersArray = await User.find({roomId: user.roomId})
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
    }) (req, res)
}

exports.newUser= async (io, userFromServer) => {
    const ioUser =  userFromServer
    let result

        const newUser = new User({
            username: ioUser.username,
            password: ioUser.password,
            roomId: ioUser.roomId,
            role: ioUser.role,
            job: ioUser.job
        })
        
        newUser.save((err, user) => {
        if(err) {
            result = {success: false, error: err}
            console.log(result)
        }else{
            result = {success: true, data: user}
            io.in(ioUser.roomId).emit('UserAdded', result)
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
            user.roomId = user.roomId,
            user.role = newUser.role,
            user.job = newUser.job

            user.save((err, updatedUser) => {
                if(err){
                    result = {success: false, error: err}
                    console.log(result)                    
                }else{
                    result = {success: true, data: updatedUser}
                    io.in(user.roomId).emit('UserUpdated', result)
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
                io.in(user.roomId).emit('UserDeleted', result)  
            }            
        })
}
