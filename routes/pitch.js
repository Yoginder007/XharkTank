const express = require('express')
const router = express.Router()


const Pitch = require('../models/pitch')
const Offer = require('../models/offer')
const validatePitchId = require('./validations')
const {filterPitch,filterPitches} =require('./filters')

router.post('/', async function(req,res){
    let id = await Pitch.count({}) + 1
    const newPitch = new Pitch({
        id: id,
        entrepreneur: req.body.entrepreneur,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        askAmount: req.body.askAmount,
        equity: req.body.equity,
        createdAt: Date.now(),
        comment: []
    })
    newPitch.save(function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("Pitch Request Succeesful");
        }
    })
})

router.post('/:pitchId/makeOffer', validatePitchId, function(req,res){
    Pitch.findOne({ id: req.params.pitchId},function(err,pitchid){
        const id =  pitchid.offers.length + 1;
        const newOffer = new Offer({
            id: id,
            investor: req.body.investor,
            amount: req.body.amount,
            equity: req.body.equity,
            comment: req.body.comment
        })
        newOffer.save(function(err, offer){
            if(err){
                res.send(err);
            }
            else{
                Pitch.findOne({ id: req.params.pitchId}, function(err,pitch){
                    if(err){
                        console.log(err);
                    }
                    else{
                        pitch.offers.push(offer);
                        pitch.save();
                    }
                })
            }
            res.send("Offer request Successful");
        })
    })
})

router.get('/',function(req,res){
    Pitch.find().sort({createdAt: 'desc'}).populate("offers").exec((err,pitches) =>{
        if(err){
            res.send(err);
        }
        else{
            res.send(JSON.stringify(filterPitches(pitches)));
        }
    })
})

router.get('/:pitchId', validatePitchId,function(req,res){
    Pitch.findOne({ id: req.params.pitchId}).populate("offers").exec(function(err,pitch){
        if(err){
            res.send(err);
        }
        else{
            res.send(JSON.stringify(filterPitch(pitch)));
        }
    })
})

module.exports = router