const express = require('express')
const router = express.Router()
const Tasks = require('../models/Tasks')

router.get('/', async (req, res)=> {
    let tasksArray = []
    try{
        tasksArray = await Tasks.find({})
        return res.status(201).send({
            error: false,
            tasksArray
        })
    }catch{
        res.status(500).send({
            error: true
        })
    }
})

//add a new task
//will also be in asset route to assign task to an asset
//in that case the asset must already be filled out but the 
//front end can send the asset id
router.post('/new', async (req, res) => {
    let newTask = req.body
    try {
        const task = new Tasks({
            createdBy: newTask.createdBy,
            assignedTo: newTask.assignedTo,
            asset: newTask.asset,
            status: newTask.status,
            desc: newTask.desc
        })
        const saveTask = await task.save()

        return res.status(201).send({
            error: false,
            saveTask
        })
    }catch{
        res.status(500).send({
            error: true
        })
    }
})

//this route will update the existing task
router.put('/:id', async(req, res) => {

})

//this route will delete a task
router.delete(':id', async (req, res) => {

})

module.exports = router