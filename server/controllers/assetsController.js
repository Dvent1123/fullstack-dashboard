const mongoose = require('mongoose')
const Assets = require('../models/Assets')
const passport = require('passport')

exports.getAssets = async (req, res) => {
    //the user info is in user and the error is in info
    passport.authenticate('jwt', {session: false}, async (err, user,info) => {
        if(err) {
            console.log(err)
        }
        if(info != undefined) {
            console.log(info.message)
            res.send(info.message)
        }else {
            console.log(user)
            let assetsArray = []
            try{
                assetsArray = await Assets.find({roomId: user.roomId})
                return res.status(201).send({
                    error: false,
                    assetsArray
                })
            }catch{
                res.status(500).send({
                    error: true,
                })
            }
        }
    }) (req, res)
}

exports.newAsset = async (io, assetFromServer) => {
    let ioAsset = assetFromServer
    let result;

    const newAsset = new Assets({
             name: ioAsset.name,
             roomId: ioAsset.roomId,
             status: ioAsset.status,
             location: ioAsset.location,
             desc: ioAsset.desc
         })
     newAsset.save((err, asset) => {
        if(err) {
            result = {success: false, error: err}
            io.in(ioAsset.roomId).emit('AssetAdded', result)
        }else{
            result = {success: true, data: asset}
            io.in(ioAsset.roomId).emit('AssetAdded', result)
        }   
    })
}

exports.updateAsset = async (io, assetFromServer) => {
    const  id  = assetFromServer.id
    let newAsset = assetFromServer
    let result

        let asset = await Assets.findById(id)

            asset.name = newAsset.name,
            asset.roomId = asset.roomId,
            asset.status = newAsset.status,
            asset.location = newAsset.location,
            asset.desc = newAsset.desc

            asset.save((err, updatedAsset) => {
            if(err) {
                result = {success: false, error: err}
                io.in(asset.roomId).emit('AssetUpdated', result)
            }else{
                result = {success: true, data: updatedAsset}
                io.in(asset.roomId).emit('AssetUpdated', result)
            }   
        })
    
}

exports.deleteAsset = async (io, id) => {
        let asset = await Assets.findById(id)
        let result
        
        asset.remove((err, deletedAsset) => {
            if(err) {
                result = {success: false, error: err}
                io.in(asset.roomId).emit('AssetDeleted', result)       
            }else {
                result = {success: true, data: deletedAsset}
                io.in(asset.roomId).emit('AssetDeleted', result)  
            }
            })

}
