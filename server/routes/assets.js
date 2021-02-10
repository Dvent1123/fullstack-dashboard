const { json } = require('body-parser')
const express = require('express')
const router = express.Router()
const assetsController = require('../controllers/assetsController') 


router.route('/')
    .get(assetsController.getAssets)


module.exports = router