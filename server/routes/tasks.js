const express = require('express')
const router = express.Router()

router.get('/', async (req, res)=> {
    //go into database here to get tasks
    //also get assets here so we can use that to fill out the form for the new task form
    res.send({"message": "You are in the assets page"})
})

//add a new task
//will also be in asset route to assign task to an asset
//in that case the asset must already be filled out but the 
//front end can send the asset id
router.post('/new', async (req, res) => {
    const newTask =  req.body
    console.log(newTask.assignedTo)
    res.send({"message": "New Task Added", "task": newTask})
})

//this route will update the existing task
router.put('/:id', async(req, res) => {

})

//this route will delete a task
router.delete(':id', async (req, res) => {

})

module.exports = router