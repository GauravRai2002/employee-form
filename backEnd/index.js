const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 5000;
const dotenv = require('dotenv').config();
var cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));


mongoose.connect( process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo')
})

mongoose.connection.on('error', (err)=>{
    console.log('Error : ',err)
})


const userRequest = require('./models')
app.use('/employee',userRequest)

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})