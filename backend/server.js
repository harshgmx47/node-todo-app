const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port =process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//Intialize Directory 
app.use(express.static('../assets'));
app.get('./index.html',(req,res)=>{
 res.sendFile(__dirname +"/"+"index.html");
 })
 //Setup MonogoDB
 const uri = process.env.MONGO_URL;
 mongoose.connect(uri,  {
     useNewUrlParser:true,
     useUnifiedTopology:true
 })
 const connection = mongoose.connection;
 connection.once('open', () => {
     console.log('MongoDB databse connection established successfully');
 })
 const usersRouter = require('./routes/users');
 app.use('/users',usersRouter);



app.listen(port ,()=>{
    console.log(`Sever is Running!${port}`)

});