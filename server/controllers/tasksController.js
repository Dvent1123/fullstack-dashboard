const mongoose = require('mongoose')
const Tasks = require('../models/Tasks')
const passport = require('passport')

exports.getTasks = async (req, res) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        res.send(info.message)
      } else {
            let tasksArray = []
            try{
                tasksArray = await Tasks.find({roomId: user.roomId})
                return res.status(201).send({
                    error: false,
                    tasksArray
                })
            }catch{
                res.status(500).send({
                    error: true
                })
            }
      }
    }) (req, res)
}

exports.newTask = async (io, taskFromServer) => {
    let ioTask = taskFromServer
    let result;

    const newTask = new Tasks({
            createdBy: ioTask.createdBy,
            roomId: ioTask.roomId,
            assignedTo: ioTask.assignedTo,
            asset: ioTask.asset,
            status: ioTask.status,
            desc: ioTask.desc
        })

        newTask.save((err, task) => {
            if(err) {
                result = {success: false, error: err}
                console.log(result)            
            }else{
                result = {success: true, data: task}
                io.in(ioTask.roomId).emit('TaskAdded', result)
            }
        })
        
        
}

exports.updateTask = async (io, taskFromServer) => {
    const  id  = taskFromServer.id
    let newTask = taskFromServer
    let result
    
        let task = await Tasks.findById(id)
            task.createdBy = newTask.createdBy,
            task.roomId = task.roomId,
            task.assignedTo = newTask.assignedTo,
            task.asset = newTask.asset,
            task.status = newTask.status,
            task.desc = newTask.desc

            task.save((err, updatedTask) => {
                if(err) {
                result = {success: false, error: err}
                console.log(result)                    
                }else{
                    result = {success: true, data: updatedTask}
                    io.in(task.roomId).emit('TaskUpdated', result)
                }
            })

}

exports.deleteTask = async (io, id) => {
        let task = await Tasks.findById(id).then(test => {return test})
        let result

        task.remove((err, deletedTask) => {
            if(err) {
                result = {success: false, error: err}
                console.log(result)                       
            }else{
                result = {success: true,data: deletedTask}
                io.in(task.roomId).emit('TaskDeleted', result)
            }
        })
    }
