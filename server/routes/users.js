const express = require('express')
const router = express.Router()

router.get('/', async (req, res)=> {
    //go into database here to get users
    res.send({"message": "You are in the users page"})
})

//add a new user
router.post('/new', async (req, res) => {
    const newUser =  req.body
    console.log(newUser.username)
    res.send({"message": "New Person Added", "person": newUser})
})

//this route will update the existing users
router.put('/:id', async(req, res) => {

})

//this route will delete a user
router.delete(':id', async (req, res) => {

})

module.exports = router


