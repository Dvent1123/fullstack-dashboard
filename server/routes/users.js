const express = require('express')
const router = express.Router()
const User = require('../models/Users')

router.get('/', async (req, res)=> {
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
})

//add a new user
router.post('/new', async (req, res) => {
    const newUser =  req.body
    console.log(newUser)
    try{
        const user = new User({
            username: newUser.username,
            password: newUser.password,
            role: newUser.role,
            job: newUser.job
        })
        console.log(user)
        const saveUser = await user.save()
        return res.status(201).send({
            error: false,
            saveUser
        })

    }catch{
        res.status(500).send({
            error: true
        })
    }
})

//this route will update the existing users
router.put('/:id', async(req, res) => {

})

//this route will delete a user
router.delete(':id', async (req, res) => {

})

module.exports = router


