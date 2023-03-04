const Pitch = require('../models/pitch')

const validatePitchId = function(req,res,next){
    Pitch.findOne({"id": req.params.pitchId},function(err,pitch){
        if(err){
            res.send(err);
        }
        else if(pitch==null){
            res.send("Pitch not found");
        }
        else{
            next();
        }
    })
}

module.exports = validatePitchId