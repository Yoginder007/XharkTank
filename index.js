const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

app.use(bodyParser.json())

const pitchRouter = require('./routes/pitch');

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin-yogi:1234@cluster0.06ogdbb.mongodb.net/shark_tank", {useNewUrlParser: true});

app.use('/pitches',pitchRouter)

app.get('/',function(req,res){ 
    res.send("Shark_Tank_App")
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
