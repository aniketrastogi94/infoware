const express = require('express');
const router  = express.Router();
const auth  = require('../config/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt=require('bcryptjs');
var sha256 = require('js-sha256').sha256;


router.post('/register',async(req,res)=>{
    try{
        const {email,password,name}=req.body;
        const newUser=new User();
        newUser.email=email;
        newUser.password=sha256(password);
        newUser.name=name;
        await newUser.save();
        return res.status(200).json({
            status:'success',
            message:'User registered successfully',
            data:newUser
        })
    }catch(err){
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})


router.get('/login',async(req,res)=>{
    try {
        const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        return res.status(400).json({
            status:'failure',
            message : 'Data missing',
            data:null
        })
    }
    const us=await User.findOne({email:email});
    if(us){
        const pas=sha256(password);
        if(pas===us.password){
            return res.status(200).json({
                status:'success',
                message:'Login successful',
                data:{
                    user:us,
                    token:"Bearer "+generateToken(us._id)
                }
            })
        }else{
            return res.status(402).json({
                status:'failure',
                message:'Password dont match',
                data:null
            })
        }
    }else{
        return res.status(403).json({
            status:'failure',
            message:'User not found',
            data:null
        })
    }
    } catch (err) {
        return res.status(403).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
    
})


router.get('/productInfo/:id',async(req,res)=>{
    try {
        const pro=await Product.findById(req.params.id);
        if(pro){
            return res.status(200).json({
                status:'success',
                message:'Product found successfully',
                data:pro
            })
        }else{
            return res.status(402).json({
                status:'failure',
                message:'No product found with this id',
                data:null
            })
        }
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.get('/products',async(req,res)=>{
    try {
        const pro=await Product.find();
        return res.status(200).json({
            status:'failure',
            message:'Products found successfully',
            data:pro
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})


router.post('/order',auth,async(req,res)=>{
    try {
        const {products,price}=req.body;
        const newOrder=new Order();
        newOrder.products=products;
        newOrder.price=price;
        newOrder.userid=req.user.id;
        await newOrder.save();
        return res.status(200).json({
            status:'success',
            message:'Order created successfully',
            data:newOrder
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})


router.get('/viewOrder',auth,async(req,res)=>{
    try {
        const ord=await Order.find({userid:req.user.id});
        return res.status(200).json({
            status:'success',
            message:'Orders found successfully',
            data:ord
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

module.exports=router;




