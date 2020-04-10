const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Shop = require('../models/shop');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/node", { useNewUrlParser: true,useUnifiedTopology: true } , function(err){
    if (err){
        console.error('error while connecting'+err);
    }
});

mongoose.connection.once('open',function(){
    console.log('connection works outside');
}).on('error',function(){
    console.log('errpr while connecting');
});



router.post('/',function(req,res){
    console.log('Going to post a new shop');
    var newShop = new Shop();
    newShop.shopName = req.body.shopName;
    newShop.ownerName = req.body.ownerName;
    newShop.contactNumber = req.body.contactNumber;
    newShop.whatsAppNumber = req.body.whatsAppNumber;
    newShop.shopAddress = req.body.shopAddress;
    newShop.location = req.body.location;
    newShop.save(function(err,insertedShop){
        if (err){
            console.log('error while saving the Shop'+err);
        }else{
            res.json(insertedShop);
        }
    });
});

router.get('/',function(req,res){
    console.log('going to fetch all shops');
    Shop.find({})
        .exec(function(err,Shops){
            if (err){
                console.log('error while fetching the Shop'+err);
            }else{
                res.json(Shops);
            }
        })
});

router.get('/:id',function(req,res){
    console.log('going to fetch all shops');
    Shop.findById(req.params.id)
        .exec(function(err,Shops){
            if (err){
                console.log('error while fetching the Shop'+err);
            }else{
                res.json(Shops);
            }
        })
});

router.put('/',function(req,res){
    console.log('going to update Shop');
    Shop.findOneAndUpdate(req.params.id,
        {
            $set:{
                shopName : req.body.shopName,
                ownerName : req.body.ownerName,
                contactNumber : req.body.contactNumber,
                whatsAppNumber : req.body.whatsAppNumber,
                location : req.body.location,
                shopAddress : req.body.shopAddress
            }
        },
        {
            new: true
        },
        function(err,updatedShop){
            if(err){
                res.send('error while updating shop'+err);
            }else{
                res.json(updatedShop);
            }
        }
    );
});

module.exports = router;