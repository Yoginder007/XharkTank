const mongoose = require('mongoose')
 
const offerSchema = new mongoose.Schema({
    id: Number,
    investor: String,
    amount: Number,
    equity: Number,
    comment: String
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer