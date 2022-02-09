const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const authroute = require('./routes/auth')

mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser : true , useUnifiedTopology : true }
    ).then(()=>console.log("mongoDB connected")).catch(err=>console.log(err))

app.use(express.json())
app.use('/api/auth', authroute)

const PORT = 40000

app.listen(PORT, ()=>{
    console.log('back end is working fine')
})