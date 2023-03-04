const mongoose = require('mongoose')
 
const pitchSchema = new mongoose.Schema({
    id: Number,
    entrepreneur: String,
    pitchTitle: String,
    pitchIdea: String,
    askAmount: Number,
    equity: Number,
    createdAt: Date,
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
    }]
});

const Pitch = mongoose.model('Pitch',pitchSchema);
module.exports = Pitch