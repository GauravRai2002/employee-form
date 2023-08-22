const express = require('express');
const { mongoose, mongo } = require('mongoose');
const router = express.Router();

const { Cloudinary } = require('./utils/cloudinary')



const employeeSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    fatherName: {
        type: String ,
        required: true
    },
    guarantee: {
        type: String ,
        required: true,
    },
    address: {
        type: String ,
        required: true
    },
    gender: {
        type: String ,
        required: true,
    },
    experience: {
        type: String ,
        required: true,
    },
    code: {
        type: String ,
        required: true,
        unique : true,
    },
    photo: {
        type: String ,
        required: false,
    },
    dob: {
        type: String ,
        required: false,
    },
    url:{
        type: String,
        required:true
    }
})


const Employee = mongoose.model('employee', employeeSchema)

router.post('/add', async (req,res)=>{
    const employee = new Employee(req.body)
    employee.save()
    res.send(req.body)
})

router.post('/upload',async (req,res)=>{
    try {
        const fileStr = req.body.data;
        const uploadedResponce = await Cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ml_default'
        })
        res.json({'res':uploadedResponce.url})
    } catch (error) {
        console.log(error)
    }
})

router.get('/getEmp/:id',async(req,res)=>{
    try {
        const employee = await Employee.findOne({'code':req.params.id})
        res.json(employee)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router